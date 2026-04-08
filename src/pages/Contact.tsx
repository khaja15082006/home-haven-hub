import { useState } from "react";
import { addMessage } from "@/data/bookings";
import { Mail, CheckCircle, Send } from "lucide-react";

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
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-2">
        <Mail className="h-6 w-6 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">Contact Us</h1>
      </div>
      {success && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
          <CheckCircle className="h-5 w-5" />
          Message sent successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border bg-card p-8 shadow-card">
        <input name="name" placeholder="Your Name" required className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <input name="email" type="email" placeholder="Email Address" required className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <textarea name="message" placeholder="Your message..." rows={5} required className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        <button type="submit" className="gradient-primary flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-primary-foreground transition hover:opacity-90">
          <Send className="h-4 w-4" /> Send Message
        </button>
      </form>
    </div>
  );
}
