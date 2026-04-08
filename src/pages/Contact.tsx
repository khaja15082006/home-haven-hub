import { useState } from "react";
import { motion } from "framer-motion";
import { addMessage } from "@/data/bookings";
import { Mail, CheckCircle, Send, MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@stayfinder.in" },
  { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
  { icon: MapPin, label: "Visit Us", value: "Chennai, Tamil Nadu, India" },
  { icon: Clock, label: "Working Hours", value: "Mon - Sat, 9am - 6pm" },
];

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    addMessage({
      name: data.get("name") as string,
      email: data.get("email") as string,
      message: data.get("message") as string,
    });
    setSuccess(true);
    form.reset();
    setTimeout(() => setSuccess(false), 4000);
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="section-badge"><Mail className="h-3.5 w-3.5" /> Get in Touch</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          Contact <span className="text-gradient">Us</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Have a question or feedback? We'd love to hear from you. Drop us a message and we'll get back within 24 hours.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        {/* Contact Info */}
        <motion.div className="lg:col-span-2 space-y-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          {contactInfo.map((item, i) => (
            <div key={i} className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="gradient-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <item.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-card-foreground">{item.label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 p-5">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-700">Message sent successfully! We'll respond within 24 hours.</p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border bg-card p-8 shadow-card">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                <input name="name" placeholder="Your full name" required className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input name="email" type="email" placeholder="you@email.com" required className="input-field" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
              <textarea name="message" placeholder="Tell us how we can help..." rows={6} required className="input-field resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full py-4">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
