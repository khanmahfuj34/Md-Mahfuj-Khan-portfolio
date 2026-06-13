import React from "react";
import { ArrowUp, Terminal, Heart } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "activities", label: "Activities" },
    { id: "github", label: "Codebase" },
    { id: "contact", label: "Contact" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="border-t border-gray-150 bg-white py-12 transition-colors duration-300 dark:border-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Logo element */}
          <div className="flex items-center space-x-2 font-display text-base font-bold text-gray-900 dark:text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 font-mono text-xs text-white">
              <Terminal size={12} />
            </div>
            <span>
              mahfuj<span className="text-blue-600 dark:text-blue-400">.dev</span>
            </span>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll back top"
          >
            <ArrowUp size={15} />
          </button>

        </div>

        {/* License and credit lines */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-[11px] text-gray-450 dark:border-gray-900 dark:text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-4">
          <p>© {new Date().getFullYear()} Md Mahfuj Al Hossain Khan. All rights secured internationally.</p>
          <p className="flex items-center justify-center gap-1">
            Engineered with <Heart size={10} className="text-red-500 animate-pulse" /> using Next-gen TypeScript and React Ecosystems.
          </p>
        </div>

      </div>
    </footer>
  );
};
