import React from "react";
import {
  Sparkles,
  GraduationCap,
  MapPin,
  Search,
  Milestone,
  Calendar,
  Layers,
} from "lucide-react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "../data";

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="about-section relative py-24 md:py-32 transition-colors duration-300"
    >
      {/* Ambient radial glows to blend with Hero bridge */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[400px] w-[600px] rounded-full bg-purple-900/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[350px] w-[500px] rounded-full bg-indigo-900/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24">

        {/* ── Section header ── */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-400">
              <span className="h-px w-8 bg-purple-400" />
              <span className="font-mono text-sm font-semibold tracking-widest uppercase">
                01 / About Me
              </span>
            </div>
            <h2
              className="font-display font-extrabold tracking-tight text-white leading-[1.2]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Sensing Code, Designing Experiences
            </h2>
          </div>
          <p className="max-w-sm text-sm text-gray-500 leading-relaxed">
            A full-stack engineer building with Next.js, database clusters,
            and secure role authorization engines.
          </p>
        </div>

        {/* ── Content grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 lg:grid-cols-12"
        >
          {/* LEFT — narrative */}
          <motion.div variants={cardVariants} className="lg:col-span-7 flex flex-col gap-5">

            {/* Philosophy card */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold text-white mb-4">
                The Engineering Philosophy
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {PERSONAL_INFO.aboutDetailed}
              </p>
            </div>

            {/* Detail mini-cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.025] p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <MapPin size={17} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Based In</h4>
                  <p className="mt-0.5 text-xs text-gray-500">Dhaka, Bangladesh (UTC+6)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.025] p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <GraduationCap size={17} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Education</h4>
                  <p className="mt-0.5 text-xs text-gray-500">B.Sc. CSE at Daffodil Int. University</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — status cards */}
          <motion.div variants={cardVariants} className="lg:col-span-5 flex flex-col gap-5">

            {/* Availability badge card */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/15 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 p-6">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-purple-500/15 blur-2xl" />

              <div className="flex items-center gap-2 text-purple-400 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Internship Availability Matrix
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-white">
                Active &amp; Prepared to Onboard
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Fully trained across clean architecture, Agile pipelines, Node deployment
                configurations, and responsive state handlers. Open for hybrid and remote internships.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["⚡ Full-time Devotion", "⚙️ SPA / Full Stack", "🤝 Collaborative Mindset"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning timeline card */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-6 backdrop-blur-sm">
              <h4 className="font-display text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <Milestone size={14} className="text-purple-400" />
                The Learning Journey Timeline
              </h4>

              <div className="space-y-4">
                {[
                  { icon: Calendar, label: "Undergrad Journey", value: "4th Year (Ongoing)" },
                  { icon: Layers, label: "Specialized Domain Focus", value: "Full Stack Engineering" },
                  { icon: Search, label: "Open-Source Contributions", value: "Active on GitHub" },
                ].map(({ icon: Icon, label, value }, idx, arr) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between ${idx < arr.length - 1 ? "border-b border-white/5 pb-4" : ""
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={13} className="text-gray-500" />
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
