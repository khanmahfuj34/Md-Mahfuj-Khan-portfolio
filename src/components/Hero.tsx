import React, { useRef, useState, useEffect } from "react";
import {
  Send,
  Download,
  ArrowDownCircle,
  Sparkles,
  Briefcase,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { PERSONAL_INFO } from "../data";
import profileImg from "../../assets/photo.png";

interface HeroProps {
  activeSection?: string;
}

export const Hero: React.FC<HeroProps> = ({ activeSection = "hero" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  // Typing effect
  const words = ["Full Stack Developer", "CSE Undergrad", "Problem Solver", "React Enthusiast"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Generate stars once
  useEffect(() => {
    setStars(
      Array.from({ length: 50 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  // Mouse glow tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleType = () => {
      const fullWord = words[wordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(80);
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(40);
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };
    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 350], [1, 0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 85;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume/Mahfuj_Khan_CV_fweb.pdf";
    link.download = "Mahfuj_Khan_Resume.pdf";
    link.click();
  };

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Tech Stack" },
    { id: "education", label: "Qualification" },
    { id: "projects", label: "Projects" },
    { id: "activities", label: "Activities" },
    { id: "github", label: "Codebase" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32"
    >
      {/* ── Mouse-following glow ── */}
      <div
        className="pointer-events-none absolute rounded-full blur-[160px] transition-all duration-500"
        style={{
          width: 700,
          height: 700,
          left: mousePosition.x - 350,
          top: mousePosition.y - 350,
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Background stars ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {stars.map((s, i) => (
          <div
            key={i}
            className="star-twinkle absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-[500px] w-[500px] rounded-full bg-purple-700/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-indigo-800/10 blur-[160px]" />

      {/* ── Left social bar — md+ only ── */}
      <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-30">
        {[
          { href: PERSONAL_INFO.linkedin, label: "LinkedIn", Icon: Linkedin, color: "#0a66c2" },
          { href: PERSONAL_INFO.github, label: "GitHub", Icon: Github, color: "#e2e8f0" },
          { href: PERSONAL_INFO.twitter, label: "Twitter", Icon: Twitter, color: "#1da1f2" },
        ].map(({ href, label, Icon, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} Profile`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-gray-300 transition-all duration-300 hover:scale-110 hover:text-white hover:border-white/25 hover:bg-white/10"
            style={{ "--hover-color": color } as React.CSSProperties}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      {/* ── Right section dots — lg+ only ── */}
      <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3.5 z-30">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${sec.label}`}
          >
            <span className="mr-3 scale-0 rounded-full bg-[#0e0a24]/90 border border-[#2b2164]/60 px-2.5 py-1 text-[9px] font-bold text-gray-300 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 shadow-md backdrop-blur-sm whitespace-nowrap">
              {sec.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${activeSection === sec.id
                ? "h-3 w-3 bg-purple-500 ring-4 ring-purple-500/25"
                : "h-2 w-2 bg-white/25 hover:bg-white/60 hover:scale-125"
                }`}
            />
          </button>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-20 lg:gap-x-12 xl:gap-x-20 items-center">

          {/* ════════════════════════════
              LEFT — Text content
          ════════════════════════════ */}
          <motion.div
            style={{ opacity: opacityHero }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 md:gap-8 text-center lg:text-left"
          >
            {/* Status badge */}
            <div className="inline-flex mx-auto lg:mx-0 w-fit items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles size={12} className="text-purple-400 animate-pulse" />
              <span className="text-xs font-semibold text-purple-300 tracking-wide">
                Internship Ready · Open for Opportunities
              </span>
            </div>

            {/* Heading group */}
            <div className="flex flex-col gap-3">
              <span className="font-display text-base sm:text-lg font-medium text-gray-400">
                Hey, I'm 👋
              </span>

              <h1
                className="font-display font-extrabold tracking-tight text-white leading-[1.2]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
              >
                {PERSONAL_INFO.name}
              </h1>

              {/* Typing subtitle */}
              <div className="flex items-center justify-center lg:justify-start gap-1 min-h-[2.25rem]">
                <span
                  className="font-display font-bold text-gray-200"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
                >
                  I am a{" "}
                  <span className="text-purple-400 border-r-2 border-purple-400 pr-0.5 animate-pulse">
                    {currentText}
                  </span>
                </span>
              </div>
            </div>

            {/* Taglines */}
            <div className="flex flex-col gap-1.5 text-gray-400">
              <p
                className="flex items-center justify-center lg:justify-start gap-2 font-medium"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
              >
                🚀 Turning ideas into Stunning Websites 💻
              </p>
              <p
                className="flex items-center justify-center lg:justify-start gap-2 opacity-70"
                style={{ fontSize: "clamp(0.8rem, 1.3vw, 0.9rem)" }}
              >
                <span className="text-purple-500">|</span> Available for projects and collaborations ☀️
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-700/30 transition-all duration-300 hover:bg-purple-700 hover:shadow-purple-600/40 active:scale-[0.97]"
              >
                Say Hello
                <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={handleDownloadResume}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-gray-200 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-[0.97]"
              >
                <Download size={14} />
                Download Resume
              </button>
            </div>

            {/* Social links — mobile only (lg hides the absolute bar) */}
            <div className="flex items-center justify-center lg:hidden gap-3 pt-2">
              {[
                { href: PERSONAL_INFO.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: PERSONAL_INFO.github, label: "GitHub", Icon: Github },
                { href: PERSONAL_INFO.twitter, label: "Twitter", Icon: Twitter },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ════════════════════════════
              RIGHT — Profile image
          ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Halo glow */}
            <div className="absolute h-[380px] w-[380px] rounded-full blur-[100px] bg-purple-600/15 pointer-events-none" />

            {/* Profile blob wrapper — max-w ensures it never overflows */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[450px]">

              {/* Gradient border blob */}
              <div className="profile-blob p-[3px] bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 shadow-[0_0_60px_rgba(139,92,246,0.30)]">
                {/* Inner frame */}
                <div className="profile-blob relative overflow-hidden bg-[#090518] w-full aspect-[5/6]">

                  {/* Grid mesh */}
                  <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_0.5px,transparent_0.5px)] [background-size:22px_22px] opacity-[0.07]" />

                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-purple-950/30 to-transparent" />

                  {/* Scanner line - Photo এর পিছনে */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-[2px] bg-purple-400/40 z-[2] pointer-events-none"
                  />

                  {/* Profile photo */}
                  <img
                    src={profileImg}
                    alt={PERSONAL_INFO.name}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-105 origin-top transition-transform duration-700 hover:scale-110 z-10"
                  />
                </div>
              </div>

              {/* ─ Floating stat card 1: Problem Solving (top-right) ─ */}
              <div className="absolute -top-5 -right-4 sm:-right-6 glass-card rounded-2xl px-3 py-2.5 flex items-center gap-2.5 animate-float-slow z-20 whitespace-nowrap">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                  <CheckCircle size={15} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">120+</div>
                  <div className="text-[9px] text-gray-400 font-semibold mt-0.5">Problem Solving</div>
                </div>
              </div>

              {/* ─ Floating stat card 2: Fresher (mid-left) ─ */}
              <div className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 glass-card rounded-2xl px-3 py-2.5 flex items-center gap-2.5 animate-float-medium z-20 whitespace-nowrap">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                  <Sparkles size={15} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">Fresher</div>
                  <div className="text-[9px] text-gray-400 font-semibold mt-0.5">Enthusiastic Learner</div>
                </div>
              </div>

              {/* ─ Floating stat card 3: Projects (bottom-right) ─ */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 glass-card rounded-2xl px-3 py-2.5 flex items-center gap-2.5 animate-float-fast z-20 whitespace-nowrap">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                  <Briefcase size={15} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">20+</div>
                  <div className="text-[9px] text-gray-400 font-semibold mt-0.5">Finished Projects</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Section bridge (seamless gradient into About) ── */}
      <div className="section-bridge" />

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors duration-300"
        >
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDownCircle size={17} />
          </motion.div>
        </button>
      </div>
    </section>
  );
};
