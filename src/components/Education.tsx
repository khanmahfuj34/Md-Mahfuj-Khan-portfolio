import React from "react";
import { GraduationCap, Award, MapPin, Calendar, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { EDUCATION } from "../data";

export const Education: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="education"
      className="relative bg-slate-50/50 py-20 transition-colors duration-300 dark:bg-gray-900/40"
    >
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="space-y-4 text-center md:mx-auto md:max-w-2xl mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <span className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase">04 / Academic Foundation</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Educational Trajectory
          </h2>
          <p className="text-base text-slate-500 dark:text-gray-400">
            A history of rigorous learning with continuous technical devotion.
          </p>
        </div>

        {/* TIMELINE TRACK */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l-2 border-slate-200 pl-6 dark:border-gray-800 sm:pl-10"
        >
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Connector Circle Point */}
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-4 ring-blue-100 dark:bg-gray-950 dark:ring-blue-900/30">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              </span>

              {/* Card Surface */}
              <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xs backdrop-blur-md transition-all hover:border-blue-500/30 hover:shadow-md dark:border-gray-800/80 dark:bg-gray-950/40">
                {/* Visual hovering border accent */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity dark:bg-blue-500" />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  
                  {/* Left Side: Major Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1.5">
                      <GraduationCap size={16} className="text-blue-600 dark:text-blue-400" />
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {edu.degree}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 dark:text-gray-400">
                      <span className="font-semibold text-slate-700 dark:text-gray-300">
                        {edu.institution}
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 font-mono">
                        <Calendar size={12} />
                        <span>{edu.period}</span>
                      </span>
                    </div>

                    {edu.description && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-gray-400">
                        {edu.description}
                      </p>
                    )}

                    {edu.achievements && (
                      <div className="mt-3.5 space-y-1">
                        {edu.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-gray-400">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Side: GPA Badges (if present) */}
                  {edu.gpa && (
                    <div className="flex h-fit w-fit items-center space-x-1.5 rounded-lg bg-emerald-50/50 border border-emerald-100 px-3 py-1.5 dark:bg-emerald-950/20 dark:border-emerald-900/30">
                      <Award size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <div className="text-right">
                        <span className="block text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">GPA SECURED</span>
                        <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-300">
                          {edu.gpa} <span className="text-[10px] text-emerald-500">/ {edu.gradeMax}</span>
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
