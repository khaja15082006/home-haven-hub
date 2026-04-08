import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { PlusCircle, CheckCircle } from "lucide-react";

export default function AddPropertyPage() {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  if (!user || (user.role !== "seller" && user.role !== "admin")) {
    return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Only sellers can add properties</div>;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In localStorage mode we add to the stored custom properties
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
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
      <CheckCircle className="h-16 w-16 text-green-500" />
      <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Property Added!</h2>
      <button onClick={() => setSuccess(false)} className="gradient-primary mt-4 rounded-lg px-6 py-2 text-primary-foreground">Add Another</button>
    </div>
  );

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center gap-2">
        <PlusCircle className="h-6 w-6 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">Add Property</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border bg-card p-8 shadow-card">
        <input name="title" placeholder="Property Title" required className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <input name="city" placeholder="City" required className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <select name="type" className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30">
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Lodge">Lodge</option>
        </select>
        <input name="price" type="number" placeholder="Price per night (₹)" required className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <input name="image" placeholder="Image URL (optional)" className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <div className="grid grid-cols-3 gap-4">
          <input name="bedrooms" type="number" placeholder="Beds" defaultValue="2" className="rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="bathrooms" type="number" placeholder="Baths" defaultValue="1" className="rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="area" type="number" placeholder="Sqft" defaultValue="1000" className="rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button type="submit" className="gradient-primary w-full rounded-lg py-3 font-semibold text-primary-foreground transition hover:opacity-90">Add Property</button>
      </form>
    </div>
  );
}
