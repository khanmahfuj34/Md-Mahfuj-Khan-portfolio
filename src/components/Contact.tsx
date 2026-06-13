import React, { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { PERSONAL_INFO } from "../data";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyValue = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Simulate delightful api server latency before rendering a beautiful success frame
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative bg-white py-20 transition-colors duration-300 dark:bg-gray-950"
    >
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="space-y-4 text-center md:mx-auto md:max-w-2xl mb-16">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <span className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase">07 / Coordination</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Let's Build Something Amazing Together.
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Have an open internship slot, an engineering vacancy, or a product idea? Drop a line below!
          </p>
        </div>

        {/* DETAILS GRID */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* LEFT CHANNELS DETAIL COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/30 p-6 dark:border-gray-800 dark:bg-gray-950/20">
              <h3 className="font-display text-lg font-bold text-gray-950 dark:text-white mb-6">
                Direct Touchpoint Channels
              </h3>

              <div className="space-y-6">
                
                {/* Email block */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">Email Address</span>
                    <button
                      onClick={() => handleCopyValue(PERSONAL_INFO.email, "Email")}
                      className="mt-0.5 text-sm font-semibold text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 text-left cursor-pointer"
                    >
                      {PERSONAL_INFO.email}
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      {copiedId === "Email" ? "✓ Copied!" : "Click to copy address"}
                    </span>
                  </div>
                </div>

                {/* Telephone block */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">Direct Whatsapp / Mob</span>
                    <button
                      onClick={() => handleCopyValue(PERSONAL_INFO.phone, "Phone")}
                      className="mt-0.5 text-sm font-semibold text-gray-800 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400 text-left cursor-pointer"
                    >
                      {PERSONAL_INFO.phone}
                    </button>
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      {copiedId === "Phone" ? "✓ Copied!" : "Click to copy number"}
                    </span>
                  </div>
                </div>

                {/* Coordinates Location */}
                <div className="group flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">Primary Core Base</span>
                    <p className="mt-0.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {PERSONAL_INFO.location}
                    </p>
                    <span className="block text-[10px] text-gray-400 mt-0.5">Available for relocation</span>
                  </div>
                </div>

              </div>

              {/* Social Channels Row */}
              <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  Global Professional Channels
                </h4>
                <div className="flex items-center space-x-2.5">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-650 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                    title="Github"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-650 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                    title="LinkedIn"
                  >
                    <Linkedin size={16} className="text-[#0a66c2]" />
                  </a>
                  <a
                    href={PERSONAL_INFO.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-650 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                    title="Follow on X"
                  >
                    <span className="font-mono text-xs font-bold">𝕏</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT CONTACT FORM COLUMN */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/40">
              
              {status === "success" ? (
                /* DELIGHTFUL SUCCESS STATE NOTIFICATION */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-950 dark:text-white">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="max-w-md mx-auto text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Thank you for coordinating, Md Mahfuj Al Hossain Khan will receive your submission directly in mock transit logs. An active response window takes 4-12 hours!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 rounded-xl border border-gray-200 bg-white px-5 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Send Another Response
                  </button>
                </motion.div>
              ) : (
                /* INTERACTIVE FORM SCHEMA */
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {status === "error" && (
                    <div className="flex items-center space-x-2 rounded-xl bg-red-50 p-3 text-xs text-red-650 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400 animate-shake">
                      <AlertCircle size={14} />
                      <span>Please ensure all key form elements (Name, Email, Message) are compiled fully.</span>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name block */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/20 px-4 py-2.8 text-xs text-gray-950 outline-none transition-all focus:border-blue-500/50 focus:bg-white dark:border-gray-800 dark:bg-gray-900/20 dark:text-white dark:focus:border-blue-500/50"
                        required
                      />
                    </div>

                    {/* Email block */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="johndoe@company.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/20 px-4 py-2.8 text-xs text-gray-950 outline-none transition-all focus:border-blue-500/50 focus:bg-white dark:border-gray-800 dark:bg-gray-900/20 dark:text-white dark:focus:border-blue-500/50"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject block */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Internship Proposal / Project Discussion"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/20 px-4 py-2.8 text-xs text-gray-950 outline-none transition-all focus:border-blue-500/50 focus:bg-white dark:border-gray-800 dark:bg-gray-900/20 dark:text-white dark:focus:border-blue-500/50"
                    />
                  </div>

                  {/* Message body block */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                      Message Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Hi Mahfuj, I viewed your portfolio and we'd love to invite you for an interview regarding the Full Stack Developer internship..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/20 px-4 py-2.8 text-xs text-gray-950 outline-none transition-all focus:border-blue-500/50 focus:bg-white dark:border-gray-800 dark:bg-gray-900/20 dark:text-white dark:focus:border-blue-500/50 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 select-none cursor-pointer"
                  >
                    <Send size={14} className={status === "submitting" ? "animate-pulse" : ""} />
                    <span>{status === "submitting" ? "Transmitting..." : "Submit Coordination"}</span>
                  </button>

                  <p className="text-[10px] font-mono text-center text-gray-400 pt-1">
                    🔒 SSL encrypted pipeline connection
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
