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

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "education", "activities", "github", "contact"];
    const NAVBAR_HEIGHT = 90; // px — keeps the trigger point below the navbar

    const getActiveSection = () => {
      // Always hero at the very top of the page
      if (window.scrollY < 80) {
        setActiveSection("hero");
        return;
      }

      // Find the section whose top edge is closest to — but still above — the
      // trigger line (top of viewport + navbar offset + a small look-ahead).
      const triggerY = window.scrollY + NAVBAR_HEIGHT + window.innerHeight * 0.25;

      let current = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= triggerY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    // Run once on mount, then on every scroll
    getActiveSection();
    window.addEventListener("scroll", getActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", getActiveSection);
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

