import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Activities } from "./components/Activities";
import { GithubShowcase } from "./components/GithubShowcase";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Tech Stack" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Qualification" },
    { id: "activities", label: "Activities" },
    { id: "github", label: "Codebase" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 85;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "education", "activities", "github", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // viewport center vertical trigger margin
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollFallback = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900 transition-colors duration-500 dark:text-gray-100 bg-[#F8FAFC] dark:bg-[#080014]">
      {/* ── Global Background Stars ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="star-twinkle absolute rounded-full bg-blue-500/20 dark:bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        
        {/* ── Fixed Right section dots — lg+ only ── */}
        <div className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3.5 z-30">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-end cursor-pointer"
              aria-label={`Go to ${sec.label}`}
            >
              <span className="mr-3 scale-0 rounded-full bg-white dark:bg-[#0e0a24]/90 border border-gray-200 dark:border-[#2b2164]/60 px-2.5 py-1 text-[9px] font-bold text-gray-650 dark:text-gray-300 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 shadow-md backdrop-blur-sm whitespace-nowrap">
                {sec.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeSection === sec.id
                    ? "h-3 w-3 bg-blue-600 dark:bg-purple-500 ring-4 ring-blue-500/25 dark:ring-purple-500/25"
                    : "h-2 w-2 bg-gray-300 dark:bg-white/25 hover:bg-gray-400 dark:hover:bg-white/60 hover:scale-125"
                }`}
              />
            </button>
          ))}
        </div>

        <main>
          <Hero activeSection={activeSection} />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Activities />
          <GithubShowcase />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}

