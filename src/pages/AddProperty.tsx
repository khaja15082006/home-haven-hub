import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { PlusCircle, CheckCircle, ArrowRight, Lock } from "lucide-react";

export default function AddPropertyPage() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  if (!user || (user.role !== "seller" && user.role !== "admin")) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <Lock className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Seller Access Only</h2>
        <p className="mt-2 text-muted-foreground">Sign up as a seller to list your property</p>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const newProp = {
      id: `custom_${Date.now()}`,
      title: data.get("title") as string,
      city: data.get("city") as string,
      type: data.get("type") as string,
      price: Number(data.get("price")),
      image: (data.get("image") as string) || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
      bedrooms: Number(data.get("bedrooms")),
      bathrooms: Number(data.get("bathrooms")),
      area: Number(data.get("area")),
    };
    const stored = JSON.parse(localStorage.getItem("sf_custom_properties") || "[]");
    stored.push(newProp);
    localStorage.setItem("sf_custom_properties", JSON.stringify(stored));
    setSuccess(true);
    form.reset();
  }

  if (success) return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
      </motion.div>
      <h2 className="mt-6 font-display text-3xl font-bold text-foreground">Property Added! 🎉</h2>
      <p className="mt-2 text-muted-foreground">Your listing is now live</p>
      <button onClick={() => setSuccess(false)} className="btn-primary mt-6">Add Another <ArrowRight className="h-4 w-4" /></button>
    </div>
  );

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="section-badge"><PlusCircle className="h-3.5 w-3.5" /> List Property</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          Add <span className="text-gradient">Property</span>
        </h1>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-3xl border bg-card p-8 shadow-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Property Title</label>
          <input name="title" placeholder="e.g. Luxury Villa in Goa" required className="input-field" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">City</label>
            <input name="city" placeholder="e.g. Mumbai" required className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Property Type</label>
            <select name="type" className="input-field">
              <option value="House">🏠 House</option>
              <option value="Villa">🏡 Villa</option>
              <option value="Lodge">🏨 Lodge</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Price per Night (₹)</label>
          <input name="price" type="number" placeholder="e.g. 3500" required className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Image URL (optional)</label>
          <input name="image" placeholder="https://..." className="input-field" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Bedrooms</label>
            <input name="bedrooms" type="number" defaultValue="2" className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Bathrooms</label>
            <input name="bathrooms" type="number" defaultValue="1" className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Area (sqft)</label>
            <input name="area" type="number" defaultValue="1000" className="input-field" />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full py-4">
          <PlusCircle className="h-4 w-4" /> Publish Property
        </button>
      </motion.form>
    </div>
  );
}
