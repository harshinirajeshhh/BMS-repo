import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Send } from "lucide-react";
import { api } from "../../lib/api";
import { toast } from "sonner";

const initialForm = { name: "", email: "", company: "", role: "", buildings: "", message: "" };

export default function DemoDialog({ open, onOpenChange, intent = "demo" }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const isSales = intent === "sales";
  const title = isSales ? "Contact Sales" : "Request a Demo";
  const subtitle = isSales
    ? "Tell us about your portfolio — our team will craft a tailored proposal."
    : "See BMS live on your buildings. We will get back within one business day.";

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill name and email");
      return;
    }
    setStatus("loading");
    try {
      await api.post("/leads", { ...form, intent });
      setStatus("success");
      toast.success(isSales ? "Sales will reach out shortly." : "Demo request received!");
    } catch (err) {
      setStatus("error");
      toast.error("Could not submit. Please try again.");
    }
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setForm(initialForm);
      setStatus("idle");
    }, 300);
  };

  const field = (key, label, extra = {}) => (
    <label className="block">
      <span className="font-mono-ui text-[10px] text-white/50">{label}</span>
      <input
        type={extra.type || "text"}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        data-testid={`lead-field-${key}`}
        className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/25 transition-colors"
        placeholder={extra.placeholder || ""}
        required={extra.required}
      />
    </label>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="demo-dialog"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={close} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.3, 1] }}
            className="relative w-full max-w-lg glass-strong gradient-border rounded-[24px] p-7 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
              data-testid="dialog-close"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-[#2DD4BF]/15 flex items-center justify-center mb-4 glow-teal">
                  <CheckCircle2 size={26} className="text-[#2DD4BF]" />
                </div>
                <h3 className="font-display text-2xl font-semibold">You&apos;re on the list.</h3>
                <p className="mt-2 text-white/60 text-sm">Our team will be in touch shortly with next steps.</p>
                <button
                  onClick={close}
                  data-testid="dialog-success-close"
                  className="mt-6 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <span className="font-mono-ui text-[10px] text-[#2DD4BF]">— {intent.toUpperCase()}</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-white/60">{subtitle}</p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {field("name", "FULL NAME", { placeholder: "Jane Chen", required: true })}
                    {field("email", "WORK EMAIL", { placeholder: "jane@company.com", type: "email", required: true })}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {field("company", "COMPANY", { placeholder: "Acme Corp" })}
                    {field("role", "ROLE", { placeholder: "Head of Facilities" })}
                  </div>
                  {field("buildings", "BUILDINGS IN PORTFOLIO", { placeholder: "e.g. 12" })}
                  <label className="block">
                    <span className="font-mono-ui text-[10px] text-white/50">MESSAGE</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      data-testid="lead-field-message"
                      rows={3}
                      className="mt-1.5 w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/25 transition-colors resize-none"
                      placeholder="Tell us about your buildings and goals…"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    data-testid="lead-submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium bg-gradient-to-r from-[#2DD4BF] to-[#22c1a0] text-[#06080D] hover:brightness-110 glow-teal transition disabled:opacity-60"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : <Send size={14} />}
                    {status === "loading" ? "Submitting…" : isSales ? "Contact Sales" : "Request Demo"}
                  </button>
                  <p className="text-[10px] text-white/40 text-center">We only use your data to respond. No spam, ever.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
