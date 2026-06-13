import React, { useState, useEffect } from "react";
import { 
  Github, ExternalLink, ShieldAlert, Cpu, CheckCircle2, 
  Map, DollarSign, Activity, Terminal, Truck, ShoppingCart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS, Project } from "../data";

export const Projects: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("profast");
  
  // Real-time Delivery Simulation state machine for ProFast interactive screen
  const [deliveryStatus, setDeliveryStatus] = useState<"pending" | "transit" | "out-for-delivery" | "delivered">("pending");
  const [logs, setLogs] = useState<string[]>(["[System]: WebSocket tracking receiver ready."]);
  const [courierPosition, setCourierPosition] = useState({ x: 10, y: 30 });

  const activeProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  // Logic to simulate package tracker
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deliveryStatus === "transit") {
      setCourierPosition({ x: 35, y: 48 });
      setLogs(p => ["socket.emit('rider_coords', {x: 0.35, y: 0.48})", "[Server]: Room Broadcast dispatched", ...p]);
    } else if (deliveryStatus === "out-for-delivery") {
      setCourierPosition({ x: 68, y: 65 });
      setLogs(p => ["socket.emit('rider_coords', {x: 0.68, y: 0.65})", "[Alert]: Consignment near location. SMS sent.", ...p]);
    } else if (deliveryStatus === "delivered") {
      setCourierPosition({ x: 90, y: 32 });
      setLogs(p => ["socket.emit('consignment_secure', {status: 'delivered'})", "[Stripe]: Transaction final capture confirmed.", "[System]: Shipment complete. Connection closed.", ...p]);
    } else {
      setCourierPosition({ x: 10, y: 30 });
      setLogs(["[System]: Map initiated. Standard ping rate: 1Hz"]);
    }
  }, [deliveryStatus]);

  const handleNextSimulationStep = () => {
    if (deliveryStatus === "pending") {
      setDeliveryStatus("transit");
    } else if (deliveryStatus === "transit") {
      setDeliveryStatus("out-for-delivery");
    } else if (deliveryStatus === "out-for-delivery") {
      setDeliveryStatus("delivered");
    } else {
      setDeliveryStatus("pending");
    }
  };

  return (
    <section
      id="projects"
      className="relative bg-white py-20 transition-colors duration-300 dark:bg-gray-950"
    >
      <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] dark:bg-cyan-500/3 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <span className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">03 / Case Studies</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Selected Engineered Products
            </h2>
          </div>
          <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400 md:mt-0">
            Click on headings to cycle between major full-stack applications. Each represents a unique architectural focus.
          </p>
        </div>

        {/* PROJECTS TAB CAPTION SELECTORS */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-5 dark:border-gray-800">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`relative rounded-xl px-4 py-2.5 text-left transition-all ${
                selectedProjectId === project.id
                  ? "bg-gray-100 dark:bg-gray-900"
                  : "hover:bg-gray-50 dark:hover:bg-gray-950"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-tr ${project.accentColor}`} />
                <span className="text-sm font-bold text-gray-900 dark:text-white">{project.title}</span>
              </div>
              <span className="block mt-0.5 ml-5 text-[10px] text-gray-500 dark:text-gray-400">
                {project.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* HERO FEATURED MAIN CONTAINER: Stagger Reveal */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-10 lg:grid-cols-12"
            >
              
              {/* LEFT HALF DETAILS */}
              <div className="space-y-6 lg:col-span-6">
                <div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    {activeProject.type}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                    {activeProject.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {activeProject.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {activeProject.longDescription}
                </p>

                {/* PROJECT STATS CARDS */}
                <div className="grid grid-cols-3 gap-3">
                  {activeProject.stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-center dark:border-gray-900 dark:bg-gray-900/30">
                      <p className="font-display text-xs font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="mt-0.5 text-[9px] text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* TECHNOLOGIES TAGS */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-300">
                    Tech Stack Composition
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[...activeProject.frontendTech, ...activeProject.backendTech, ...activeProject.databaseTech, ...activeProject.additionalTech].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white border border-gray-150 px-2 py-0.8 text-[11px] font-medium text-gray-700 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ARCHITECTURE SUMMARY */}
                <div className="rounded-xl border border-gray-150 bg-gray-50/20 p-4 dark:border-gray-900 dark:bg-gray-900/10">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold mb-1">
                    System Architecture
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activeProject.architecture}
                  </p>
                </div>

                {/* CHALLENGES & SOLUTIONS BOX */}
                <div className="space-y-3.5 rounded-2xl border border-dashed border-gray-200/80 bg-white/40 p-5 dark:border-gray-800 dark:bg-gray-950/20">
                  <h4 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    <ShieldAlert size={14} />
                    <span>Technical Challenge Solved</span>
                  </h4>

                  <ul className="space-y-3">
                    {activeProject.challenges.map((challenge, index) => (
                      <li key={index} className="space-y-1">
                        <div className="flex items-start space-x-2">
                          <span className="mt-1 text-[10px] text-red-500 font-bold">⛔</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-snug">
                            {challenge}
                          </span>
                        </div>
                        {activeProject.solutions[index] && (
                          <div className="ml-5 flex items-start space-x-2">
                            <CheckCircle2 size={12} className="mt-0.5 text-emerald-500" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {activeProject.solutions[index]}
                            </span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LIVE AND GITHUB CTA */}
                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 rounded-xl bg-gray-900 px-4.5 py-2.8 text-xs font-bold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-gray-950"
                  >
                    <ExternalLink size={14} />
                    <span>Launch Live App</span>
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 rounded-xl border border-gray-200 bg-white px-4.5 py-2.8 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <Github size={14} />
                    <span>Source Repository</span>
                  </a>
                </div>

              </div>

              {/* RIGHT HALF: HIGH-FIDELITY CSS INTERACTIVE LAPTOP */}
              <div className="flex items-center justify-center lg:col-span-6">
                <div className="relative w-full max-w-[480px]">
                  
                  {/* Laptop Bezel */}
                  <div className="relative overflow-hidden rounded-t-2xl border-[10px] border-gray-900 bg-gray-950 shadow-2xl">
                    
                    {/* Screen Viewport Context */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-900 text-white">
                      
                      {activeProject.id === "profast" ? (
                        /* PROFAST ACTIVE SOCKET MAP SIMULATION */
                        <div className="flex h-full w-full flex-col">
                          {/* Map Section */}
                          <div className="relative flex-1 bg-gray-950 p-3">
                            {/* Graphic streets overlay */}
                            <div className="absolute inset-0 opacity-[0.14] pointer-events-none">
                              {/* Horizontal streets */}
                              <div className="absolute top-[20%] left-0 right-0 h-0.5 bg-gray-300" />
                              <div className="absolute top-[50%] left-0 right-0 h-0.5 bg-gray-300" />
                              <div className="absolute top-[75%] left-0 right-0 h-0.5 bg-gray-300" />
                              {/* Vertical streets */}
                              <div className="absolute left-[30%] top-0 bottom-0 w-0.5 bg-gray-300" />
                              <div className="absolute left-[60%] top-0 bottom-0 w-0.5 bg-gray-300" />
                              <div className="absolute left-[85%] top-0 bottom-0 w-0.5 bg-gray-300" />
                              {/* Mirpur & Dhaka Landmarks text */}
                              <span className="absolute top-2 left-2 text-[8px] font-mono tracking-widest uppercase">Mirpur-14 Transit Grid</span>
                              <span className="absolute bottom-2 right-2 text-[8px] font-mono tracking-widest uppercase">Daffodil Campus Node</span>
                            </div>

                            {/* Hub Terminals (Customers and Hubs) */}
                            <div className="absolute top-[20%] left-[25%] flex flex-col items-center">
                              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping absolute" />
                              <span className="h-2 w-2 rounded-full bg-blue-600 relative" />
                              <span className="text-[7px] font-mono mt-1 text-blue-400">HUB_A (Store)</span>
                            </div>

                            <div className="absolute bottom-[25%] right-[10%] flex flex-col items-center">
                              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping absolute" />
                              <span className="h-2 w-2 rounded-full bg-indigo-600 relative" />
                              <span className="text-[7px] font-mono mt-1 text-indigo-400">DEST_04 (User)</span>
                            </div>

                            {/* Simulated active path drawing line */}
                            <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="25%" y1="20%" x2="35%" y2="48%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                              <line x1="35%" y1="48%" x2="68%" y2="65%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                              <line x1="68%" y1="65%" x2="90%" y2="32%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
                            </svg>

                            {/* Animated Courier Bike Node */}
                            <motion.div
                              animate={{ 
                                left: `${courierPosition.x}%`, 
                                top: `${courierPosition.y}%` 
                              }}
                              transition={{ duration: 0.8, ease: "easeInOut" }}
                              className="absolute -translate-x-1/2 -translate-y-1/2"
                            >
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-400/25 border border-emerald-300">
                                <Truck size={12} className="animate-bounce" />
                              </div>
                            </motion.div>

                            {/* Control Click Overlay Banner */}
                            <div className="absolute top-2 right-2 flex flex-col space-y-1">
                              <button
                                onClick={handleNextSimulationStep}
                                className="rounded bg-blue-600 hover:bg-blue-700 text-[9px] font-bold px-2 py-1 text-white shadow-md active:scale-95 transition-transform"
                              >
                                Trigger Event
                              </button>
                              <span className="text-[8px] font-mono uppercase bg-gray-950/80 px-1 py-0.5 rounded text-gray-400 border border-gray-800">
                                Stat: <span className="text-emerald-400 font-bold">{deliveryStatus}</span>
                              </span>
                            </div>

                          </div>

                          {/* Terminal Logs in Sockets */}
                          <div className="h-24 bg-gray-950 border-t border-gray-800 p-2 font-mono text-[9px] text-gray-300 overflow-y-auto">
                            <div className="flex items-center space-x-1 border-b border-gray-900 pb-1 mb-1 text-gray-500 justify-between">
                              <div className="flex items-center space-x-1">
                                <Terminal size={8} />
                                <span className="text-[8px]">LOG_STREAM_MONITOR</span>
                              </div>
                              <span className="text-[7px]">PORT: 3000 // HTTP_UPGRADED</span>
                            </div>
                            {logs.map((log, idx) => (
                              <p key={idx} className={log.startsWith("[S") ? "text-blue-400" : log.startsWith("[A") ? "text-amber-400" : "text-gray-400"}>
                                {log}
                              </p>
                            ))}
                          </div>
                        </div>
                      ) : activeProject.id === "triplance" ? (
                        /* TRIPLANCE SOCIAL FLOW SIMULATION */
                        <div className="flex h-full w-full flex-col bg-gray-950 p-4 justify-between">
                          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                            <span className="font-display font-bold text-xs">Triplance Defence Dashboard</span>
                            <span className="rounded bg-purple-950 text-purple-300 px-1.5 py-0.5 text-[8px] font-mono border border-purple-800">SSL_ACTIVE</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 flex-1 align-center">
                            {/* Feed Mock */}
                            <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-2.5 space-y-2">
                              <div className="flex items-center space-x-1.5">
                                <div className="h-4 w-4 rounded-full bg-pink-500" />
                                <span className="text-[8px] font-bold text-gray-100">sajid_tourist</span>
                              </div>
                              <p className="text-[8px] text-gray-400">Just booked the Cox's Bazar adventure tour! Highly recommend the PostgreSQL lookup system!</p>
                              <div className="h-10 rounded bg-gray-800 overflow-hidden relative flex items-center justify-center">
                                <span className="text-[8px] text-gray-500">Cloudinary Asset</span>
                              </div>
                            </div>
                            
                            {/* Booking Mock */}
                            <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-2.5 space-y-2 flex flex-col justify-between">
                              <div>
                                <span className="text-[8px] text-gray-500 uppercase tracking-widest block">Selected Tour</span>
                                <span className="text-[9px] font-bold text-white block">Sajek Valley Package</span>
                              </div>

                              <div className="bg-gray-950 border border-gray-800 rounded p-1.5 flex justify-between items-center">
                                <span className="text-[8px] text-gray-400">Fee: BDT 4,500</span>
                                <span className="text-[8px] text-emerald-400 font-bold">Paid</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-[8px] font-mono text-gray-500 mt-2 text-right">
                            Prisma Client Queries: 3 active pools
                          </div>
                        </div>
                      ) : (
                        /* SWIFTCART RETAIL VIEW MOCK */
                        <div className="flex h-full w-full flex-col bg-gray-950 p-4">
                          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                            <span className="font-display font-medium text-xs flex items-center">
                              <ShoppingCart size={11} className="mr-1 text-emerald-400" /> SwiftCart Store
                            </span>
                            <div className="flex space-x-1 items-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              <span className="text-[8px] text-gray-400 font-mono">Cart: 2 items</span>
                            </div>
                          </div>

                          {/* Catalog listing mockup */}
                          <div className="grid grid-cols-2 gap-2.5 flex-1">
                            <div className="rounded border border-gray-800 p-2 flex flex-col justify-between">
                              <div className="h-12 rounded bg-gray-900 flex items-center justify-center">
                                <span className="text-[9px] text-gray-500 font-serif">Product Image</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-[8px] font-bold block truncate">Developer Mechanic Keyboard</span>
                                <span className="text-[8px] text-emerald-400 font-mono font-bold">$129.00</span>
                              </div>
                            </div>

                            <div className="rounded border border-gray-800 p-2 flex flex-col justify-between">
                              <div className="h-12 rounded bg-gray-900 flex items-center justify-center">
                                <span className="text-[9px] text-gray-500 font-serif">Product Image</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-[8px] font-bold block truncate">Ortholinear Comfort Mouse</span>
                                <span className="text-[8px] text-emerald-400 font-mono font-bold">$89.00</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Laptop Base (Keyboard Plate) */}
                  <div className="relative h-[10px] w-[108%] -ml-[4%] bg-gray-700 dark:bg-gray-800 rounded-b-xl border-t border-gray-600 shadow-md">
                    {/* Trackpad indentation notch */}
                    <div className="absolute left-1/2 -translate-x-[20px] top-0 h-[3px] w-[40px] bg-gray-900 rounded-b-md" />
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
