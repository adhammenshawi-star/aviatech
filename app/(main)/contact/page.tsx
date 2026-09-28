"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Aerospace Strategy", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to send message");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", subject: "Aerospace Strategy", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 mb-20">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:col-span-8">
              <span className="inline-block font-label uppercase tracking-[0.2rem] text-primary text-xs font-bold mb-4">Get in Touch</span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                Let&apos;s discuss your <br />
                <span className="text-gradient-blue">next project</span>.
              </h1>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                Elevating aerospace ventures through strategic engineering and operational precision. Our experts are ready to pilot your next breakthrough.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Contact Content Grid */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Inquiry Form */}
            <motion.div
              className="lg:col-span-7 bg-surface-container-lowest p-10 rounded-xl shadow-[0_20px_40px_rgba(22,28,34,0.03)] border border-outline-variant/15"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-headline text-2xl font-bold mb-8 text-on-surface">Send an Inquiry</h3>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-[#00cba9] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-white text-3xl">check</span>
                    </div>
                    <h4 className="font-headline text-xl font-bold text-on-surface mb-2">Message Sent!</h4>
                    <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours. Check your email for confirmation.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 text-primary text-sm font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">Full Name</label>
                      <input
                        className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline-variant"
                        placeholder="John Doe"
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
                      <input
                        className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline-variant"
                        placeholder="john@company.com"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">Subject</label>
                      <select
                        className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                      >
                        <option>Aerospace Strategy</option>
                        <option>Engineering Consulting</option>
                        <option>Supply Chain Optimization</option>
                        <option>Digital Transformation</option>
                        <option>Other Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">Message</label>
                      <textarea
                        className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface placeholder:text-outline-variant"
                        placeholder="Tell us about your project goals..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        required
                      />
                    </div>

                    {status === "error" && (
                      <div className="md:col-span-2 bg-error-container text-error rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {errorMsg}
                      </div>
                    )}

                    <div className="md:col-span-2 pt-4">
                      <button
                        className="w-full md:w-auto primary-gradient text-white font-headline font-bold px-10 py-4 rounded-lg shadow-lg hover:translate-y-[-2px] transition-all active:scale-95 disabled:opacity-60"
                        type="submit"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info & Map */}
            <div className="lg:col-span-5 space-y-12">
              <div className="grid grid-cols-1 gap-8">
                {[
                  { icon: "mail", title: "Email Us", details: ["info@aviatech.com", "support@aviatech.com"] },
                  { icon: "call", title: "Call Our Office", details: ["+2 01006983908", "Mon - Fri, 9am - 6pm EST"] },
                  { icon: "location_on", title: "Our Office", details: ["Office 208, Plus Mall, South Investors Area", "Fifth Settlement, New Cairo, Cairo, Egypt"] },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-6 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="bg-surface-container-high p-4 rounded-xl text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-1 text-on-surface">{item.title}</h4>
                      {item.details.map((detail, j) => (
                        <p key={j} className="text-on-surface-variant font-body">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                className="relative w-full h-[320px] rounded-xl overflow-hidden shadow-inner border border-outline-variant/15"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Plus+Mall,+Fifth+Settlement,+New+Cairo,+Cairo,+Egypt&output=embed&hl=en&z=16"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aviatech Office Location"
                />
                {/* Clickable pin overlay */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Plus+Mall,+Fifth+Settlement,+New+Cairo,+Cairo,+Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="pointer-events-auto flex flex-col items-center cursor-pointer group" style={{ marginTop: '-24px' }}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-60 scale-150" />
                      <div className="relative bg-primary text-on-primary p-2.5 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-200">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                      </div>
                    </div>
                    <div className="mt-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-on-surface shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Open in Google Maps
                    </div>
                  </div>
                </a>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-on-surface shadow-sm">
                  Our Location
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
