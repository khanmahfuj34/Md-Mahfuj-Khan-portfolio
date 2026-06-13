import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILL_CATEGORIES } from "../data";
import {
  Flame, Compass, Code2, Braces, Palette, MoveUpRight,
  Cpu, Network, Radio, KeyRound, CreditCard,
  Database, Columns3, Grid, CloudLightning, Server,
  GitBranch, Github, Triangle, Terminal, Laptop, ShieldCheck, Rocket
} from "lucide-react";
import { SiGit, SiGithub, SiVercel, SiNetlify, SiRailway } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import profastImg from "../../assets/image.png";

// Lucide and react-icons mapping component
const SkillIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  const iconProps = { className: className || "h-5 w-5", size: 20 };
  switch (iconName) {
    case "Flame": return <Flame {...iconProps} className={`${className} text-sky-500`} />;
    case "Compass": return <Compass {...iconProps} className={`${className} text-slate-800 dark:text-gray-200`} />;
    case "Code2": return <Code2 {...iconProps} className={`${className} text-blue-500`} />;
    case "Braces": return <Braces {...iconProps} className={`${className} text-yellow-500`} />;
    case "Palette": return <Palette {...iconProps} className={`${className} text-teal-400`} />;
    case "MoveUpRight": return <MoveUpRight {...iconProps} className={`${className} text-fuchsia-500`} />;
    case "Cpu": return <Cpu {...iconProps} className={`${className} text-emerald-500`} />;
    case "Network": return <Network {...iconProps} className={`${className} text-purple-400`} />;
    case "Radio": return <Radio {...iconProps} className={`${className} text-pink-500`} />;
    case "KeyRound": return <KeyRound {...iconProps} className={`${className} text-amber-500`} />;
    case "CreditCard": return <CreditCard {...iconProps} className={`${className} text-indigo-500`} />;
    case "Database": return <Database {...iconProps} className={`${className} text-green-500`} />;
    case "Columns3": return <Columns3 {...iconProps} className={`${className} text-blue-400`} />;
    case "Grid": return <Grid {...iconProps} className={`${className} text-teal-500`} />;
    case "CloudLightning": return <CloudLightning {...iconProps} className={`${className} text-orange-400`} />;
    case "Server": return <Server {...iconProps} className={`${className} text-emerald-400`} />;
    case "GitBranch": return <GitBranch {...iconProps} className={`${className} text-orange-600`} />;
    case "Github": return <Github {...iconProps} className={`${className} text-gray-800 dark:text-gray-200`} />;
    case "Triangle": return <Triangle {...iconProps} className={`${className} text-gray-950 dark:text-white`} />;
    case "Terminal": return <Terminal {...iconProps} className={`${className} text-orange-500`} />;
    case "Laptop": return <Laptop {...iconProps} className={`${className} text-sky-400`} />;
    case "Rocket": return <Rocket {...iconProps} className={`${className} text-purple-500`} />;

    // Exact Platform Icons (react-icons)
    // Using 'any' cast because IconBaseProps typing in this version doesn't export 'className' correctly
    case "SiGit": return <SiGit {...(iconProps as any)} className={`${className} text-[#F05032]`} />;
    case "SiGithub": return <SiGithub {...(iconProps as any)} className={`${className} text-black dark:text-white`} />;
    case "SiVercel": return <SiVercel {...(iconProps as any)} className={`${className} text-black dark:text-white`} />;
    case "VscVscode": return <VscVscode {...(iconProps as any)} className={`${className} text-[#007ACC]`} />;
    case "SiNetlify": return <SiNetlify {...(iconProps as any)} className={`${className} text-[#00C7B7]`} />;
    case "SiRailway": return <SiRailway {...(iconProps as any)} className={`${className} text-black dark:text-white`} />;
    
    case "ProfastImage": return <img src={profastImg} alt="Profast" className={`${className || "h-5 w-5"} object-contain`} />;

    default: return <ShieldCheck {...iconProps} className={className} />;
  }
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tech" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "tools", label: "Tools & Platforms" },
  ];

  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return SKILL_CATEGORIES.flatMap(cat => cat.skills.map(skill => ({ ...skill, categoryId: cat.id })));
    }
    const cat = SKILL_CATEGORIES.find(c => c.id === activeCategory);
    return cat ? cat.skills.map(skill => ({ ...skill, categoryId: cat.id })) : [];
  };

  const getCategoryColor = (catId: string) => {
    switch (catId) {
      case "frontend": return "bg-blue-500/10 text-blue-600 border-blue-200/40 dark:text-blue-400 dark:bg-blue-950/20";
      case "backend": return "bg-emerald-500/10 text-emerald-600 border-emerald-200/40 dark:text-emerald-400 dark:bg-emerald-950/20";
      case "database": return "bg-purple-500/10 text-purple-600 border-purple-200/40 dark:text-purple-400 dark:bg-purple-950/20";
      case "tools": return "bg-amber-500/10 text-amber-600 border-amber-200/40 dark:text-amber-400 dark:bg-amber-950/20";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <section
      id="skills"
      className="relative bg-slate-50/50 py-20 transition-colors duration-300 dark:bg-gray-900/40"
    >
      <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="space-y-4 text-center md:mx-auto md:max-w-2xl">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <span className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase">02 / Technical Spectrum</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Modern, Industry-Standard Stack
          </h2>
          <p className="text-base text-slate-500 dark:text-gray-400">
            A comprehensive matrix of technical skill structures mapped to modern enterprise standards. No arbitrary scores, just production-level proficiency.
          </p>
        </div>

        {/* FILTER CONTROL NAV */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semi-bold transition-all duration-300 cursor-pointer ${activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 dark:bg-blue-500 scale-105 ring-2 ring-blue-500/30 ring-offset-2 dark:ring-offset-gray-900"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:scale-[1.02] dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID OF INTERESTING CARDS */}
        <motion.div
          layout
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {getFilteredSkills().map((skill) => (
              <motion.div
                layout
                key={`${skill.categoryId}-${skill.name}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -3, transition: { duration: 0.12 } }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-5 shadow-xs backdrop-blur-md transition-all hover:border-blue-500/30 hover:shadow-lg dark:border-gray-800/40 dark:bg-gray-950/40 dark:hover:border-blue-500/30"
              >
                {/* Micro hovering border glow */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/2 group-hover:to-cyan-500/2 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    {/* Floating Icon Box */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 dark:border-gray-800 dark:bg-gray-900/60 transition-transform duration-200 group-hover:scale-105">
                      <SkillIcon iconName={skill.icon} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="mt-0.5 text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest">
                        {SKILL_CATEGORIES.find(c => c.id === skill.categoryId)?.title.split(" ")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Proficiency Tag Label (Classmorphic pill) */}
                  <span className={`inline-flex rounded-full border px-2.5 py-0.8 text-[10px] font-bold ${getCategoryColor(skill.categoryId)}`}>
                    {skill.label}
                  </span>
                </div>

                {/* Subtext describing core capability inside card */}

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Soft Skills Quick Accent Footer */}
        <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white/40 p-6 text-center dark:border-gray-800 dark:bg-gray-950/20">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-gray-300 uppercase tracking-wider mb-3">
            Core Behavioral Strengths
          </h4>
          <div className="flex flex-wrap justify-center gap-2.5">
            {["Active Listening", "Adaptive Professional Communication", "Team & Task Leadership", "Algorithmic Problem-Solving", "Strategic Time Management"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-50 border border-slate-200/50 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-gray-900/30 dark:border-gray-800 dark:text-gray-400"
              >
                ● {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
