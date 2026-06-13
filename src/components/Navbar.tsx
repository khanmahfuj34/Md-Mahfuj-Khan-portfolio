import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  User, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  LayoutGrid, 
  ChevronDown,
  Compass,
  Github,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Tech Stack", icon: Code2 },
    { id: "education", label: "Qualification", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: Briefcase }
  ];

  const moreItems = [
    { id: "activities", label: "Activities", icon: Compass },
    { id: "github", label: "Codebase", icon: Github },
    { id: "contact", label: "Contact", icon: Mail }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setIsMoreOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 85; // height of navbar
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

  const isMoreActive = moreItems.some(item => activeSection === item.id);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 pointer-events-none">
      {/* LOGO (Always clickable/visible) */}
      <div className="pointer-events-auto flex items-center">
        <div
          onClick={() => scrollToSection("hero")}
          className="flex cursor-pointer items-center space-x-1 font-display text-2xl font-bold tracking-wider text-gray-900 dark:text-white"
        >
          <span className="relative">
            <span className="absolute -left-2.5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-blue-500 dark:bg-purple-400" />
            M
          </span>
          <span className="text-blue-600 dark:text-purple-400">K</span>
        </div>
      </div>

      {/* CENTERED DESKTOP NAV PILL */}
      <nav className="hidden md:flex items-center pointer-events-auto glass-navbar rounded-full px-2 py-1.5 gap-1 shadow-lg max-w-fit mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 border border-blue-500 text-white shadow-[0_0_12px_rgba(37,99,235,0.3)] dark:bg-[#16103c] dark:border-[#332782]/80 dark:text-white dark:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <Icon 
                size={14} 
                className={`transition-colors ${
                  isActive 
                    ? "text-yellow-500 dark:text-yellow-400" 
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900"
                }`} 
              />
              <span>{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeNavBackground"
                  className="absolute inset-0 rounded-full bg-blue-500/5 dark:bg-purple-500/5 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {/* MORE DROPDOWN TAB */}
        <div ref={moreRef} className="relative">
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              isMoreActive
                ? "bg-blue-600 border border-blue-500 text-white shadow-[0_0_12px_rgba(37,99,235,0.3)] dark:bg-[#16103c] dark:border-[#332782]/80 dark:text-white dark:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <LayoutGrid 
              size={14} 
              className={`transition-colors ${
                isMoreActive 
                  ? "text-yellow-500 dark:text-yellow-400" 
                  : "text-gray-500 dark:text-gray-400"
              }`} 
            />
            <span>More</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
          </button>

          {/* MORE DROPDOWN MENU */}
          <AnimatePresence>
            {isMoreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 mt-2 w-48 rounded-2xl border border-gray-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md dark:border-[#2b2164]/60 dark:bg-[#0c0824]/95"
              >
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-purple-950/40 dark:text-purple-300"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900/60"
                      }`}
                    >
                      <Icon size={14} className={isActive ? "text-blue-600 dark:text-purple-400" : "text-gray-400"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* CONTROLS (Theme Toggle, Mobile Menu) */}
      <div className="pointer-events-auto flex items-center space-x-2">
        {/* THEME TOGGLE (Sun/Moon in glowing circle) */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/25 bg-white/80 text-gray-700 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 hover:border-blue-500/50 dark:border-[#382b8a]/50 dark:bg-[#0e0a24]/90 dark:text-yellow-400 dark:shadow-[0_0_15px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] dark:hover:border-purple-500/50"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} className="animate-spin-slow" /> : <Moon size={18} />}
        </button>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all hover:bg-gray-100 dark:border-[#2b2164]/50 dark:bg-[#0c0824]/90 dark:text-gray-300 dark:hover:bg-gray-900 md:hidden"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* MOBILE NAV PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed top-18 left-4 right-4 rounded-3xl border border-gray-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-lg dark:border-[#2b2164]/60 dark:bg-[#0c0824]/95 md:hidden"
          >
            <div className="space-y-1">
              {[...navItems, ...moreItems].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-600 border border-blue-500 text-white dark:bg-[#16103c] dark:border-[#332782]/80 dark:text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900/60"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-yellow-400 dark:text-yellow-400" : "text-gray-400"} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
