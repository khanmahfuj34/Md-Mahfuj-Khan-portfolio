import React from "react";
import { Trophy, Cpu, HeartHandshake, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ACTIVITIES } from "../data";

const ActivityIconMap: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  const finalClass = className || "h-6 w-6";
  switch (icon) {
    case "Trophy": return <Trophy className={`${finalClass} text-amber-500`} />;
    case "Cpu": return <Cpu className={`${finalClass} text-red-500`} />;
    case "HeartHandshake": return <HeartHandshake className={`${finalClass} text-pink-500`} />;
    default: return <Trophy className={finalClass} />;
  }
};

export const Activities: React.FC = () => {
  return (
    <section
      id="activities"
      className="relative bg-white py-20 transition-colors duration-300 dark:bg-gray-950"
    >
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <span className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">05 / Social involvement</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Leadership & Team Engagement
            </h2>
          </div>
          <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-gray-400 md:mt-0">
            Fusing analytical algorithmic pursuits with community leadership and technical prototyping networks.
          </p>
        </div>

        {/* ACTIVITIES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-xs backdrop-blur-md transition-all hover:border-blue-500/35 hover:shadow-lg dark:border-gray-850 dark:bg-gray-950/20 dark:hover:border-blue-500/30"
            >
              {/* Subtle top decoration */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Header Icon & Role info */}
                <div className="flex items-center justify-between">
                  {/* Glowing Icon Frame */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-200 group-hover:scale-105 dark:bg-gray-900 dark:border-gray-800">
                    <ActivityIconMap icon={act.icon} />
                  </div>
                  
                  {/* Period badge */}
                  <span className="font-mono text-[10px] text-slate-500 dark:text-gray-500">
                    {act.period}
                  </span>
                </div>

                {/* Body details */}
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {act.title}
                  </h3>
                  <p className="font-mono text-[10px] text-slate-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
                    {act.role} @ {act.organization}
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 dark:text-gray-400">
                  {act.description}
                </p>
              </div>

              {/* Tag matrix elements */}
              <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-gray-800/20">
                <div className="flex flex-wrap gap-1.5">
                  {act.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-600 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
