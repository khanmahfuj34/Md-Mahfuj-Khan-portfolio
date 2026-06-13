import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export const ScrollToTop: React.FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Track visibility using native scroll listener for 100% reliability on mobile viewports
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG ring properties
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1 px

  // Transform scroll progress motion value [0, 1] to path offset [circumference, 0]
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/85 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md outline-none cursor-pointer transition-colors duration-300 dark:bg-[#0c0824]/85 dark:border-[#2b2164]/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
          aria-label="Back to top"
        >
          {/* Circular Progress Ring SVG */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" /> {/* Purple */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
              </linearGradient>
            </defs>
            {/* Track Ring */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="rgba(0, 0, 0, 0.04)"
              strokeWidth="2.5"
              fill="none"
              className="dark:stroke-white/5"
            />
            {/* Progress Ring */}
            <motion.circle
              cx="24"
              cy="24"
              r={radius}
              stroke="url(#scrollProgressGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
            />
          </svg>

          {/* Upward Arrow Icon */}
          <ArrowUp
            size={18}
            className="text-purple-600 dark:text-purple-400 transition-colors"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
