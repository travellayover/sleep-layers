"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { BrandWaveMark, BrandWordmark } from "@/components/public/brand-logo";
import { prefersReducedMotion } from "@/lib/animations";

const SESSION_KEY = "msl-intro-seen";

type IntroContextValue = {
  /** True once the brand intro has finished (or was skipped). */
  introDone: boolean;
};

const IntroContext = createContext<IntroContextValue>({ introDone: true });

export function useIntroDone(): boolean {
  return useContext(IntroContext).introDone;
}

function readIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Brand loading / intro overlay — wave mark + gold dot, then reveal.
 * Plays once per browser session; respects prefers-reduced-motion.
 */
export function IntroProvider({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [introDone, setIntroDone] = useState(() => {
    if (!enabled) return true;
    if (typeof window === "undefined") return false;
    return (
      readIntroSeen() ||
      document.documentElement.classList.contains("msl-intro-skip")
    );
  });
  const [showLoader, setShowLoader] = useState(() => {
    if (!enabled) return false;
    if (typeof window === "undefined") return true;
    if (document.documentElement.classList.contains("msl-intro-skip")) {
      return false;
    }
    return !readIntroSeen();
  });
  const settled = useRef(false);

  useEffect(() => {
    if (!enabled) {
      settled.current = true;
      setIntroDone(true);
      setShowLoader(false);
      return;
    }
    if (
      readIntroSeen() ||
      document.documentElement.classList.contains("msl-intro-skip")
    ) {
      settled.current = true;
      document.documentElement.classList.add("msl-intro-skip");
      setIntroDone(true);
      setShowLoader(false);
      return;
    }
    if (settled.current) return;
    setShowLoader(true);
    setIntroDone(false);
  }, [enabled]);

  const complete = useCallback(() => {
    settled.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.classList.add("msl-intro-skip");
    setIntroDone(true);
    setShowLoader(false);
  }, []);

  return (
    <IntroContext.Provider value={{ introDone }}>
      {showLoader ? <PageLoader onComplete={complete} /> : null}
      {children}
    </IntroContext.Provider>
  );
}

function PageLoader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const completed = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      if (completed.current) return;
      completed.current = true;
      document.documentElement.classList.remove("msl-intro-active");
      onCompleteRef.current();
    };

    document.documentElement.classList.add("msl-intro-active");
    const safety = window.setTimeout(finish, 2800);

    if (prefersReducedMotion()) {
      const t = window.setTimeout(finish, 140);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(safety);
        document.documentElement.classList.remove("msl-intro-active");
      };
    }

    const mark = markRef.current;
    const word = wordRef.current;

    gsap.set(root, { yPercent: 0, opacity: 1 });
    if (mark) gsap.set(mark, { opacity: 0, scale: 0.88, filter: "blur(8px)" });
    if (word) gsap.set(word, { opacity: 0, y: 14, filter: "blur(4px)" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: finish,
    });

    if (mark) {
      tl.to(
        mark,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7 },
        0
      );
    }
    if (word) {
      tl.to(
        word,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55 },
        0.22
      );
    }
    /* Soft dissolve into the same night plane — no hard wipe */
    tl.to(root, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, 1.15);

    return () => {
      tl.kill();
      window.clearTimeout(safety);
      document.documentElement.classList.remove("msl-intro-active");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-msl-loader
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center will-change-transform"
      style={{
        background:
          "linear-gradient(165deg, #132456 0%, #0B1B3A 48%, #00081F 100%)",
      }}
      role="status"
      aria-live="polite"
      aria-label="MySleepLabs loading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute -left-[15%] top-[-10%] h-[55%] w-[70%] rounded-full opacity-90 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(91,103,232,0.22) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute -right-[10%] bottom-[5%] h-[45%] w-[55%] rounded-full opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(242,184,75,0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      <div ref={markRef} className="relative z-10">
        <BrandWaveMark size="xl" variant="onDark" withCircle animate />
      </div>
      <div ref={wordRef} className="relative z-10 mt-5">
        <BrandWordmark size="lg" variant="onDark" />
      </div>
      <p className="sr-only">Loading MySleepLabs</p>
    </div>
  );
}
