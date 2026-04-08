import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, MapPin, Star, Shield, Home as HomeIcon, Building2, Users, Sparkles, Quote, ChevronRight, TrendingUp } from "lucide-react";
import bannerImg from "@/assets/banner.jpg";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

const stats = [
  { value: "675+", label: "Properties", icon: Building2 },
  { value: "45+", label: "Cities", icon: MapPin },
  { value: "10K+", label: "Happy Guests", icon: Users },
  { value: "4.9", label: "Rating", icon: Star },
];

const features = [
  { icon: Search, title: "Smart Search", desc: "Find your ideal stay with powerful filters across 45+ cities. Search by location, price, and property type." },
  { icon: Shield, title: "Verified & Safe", desc: "Every listing is personally verified. Book with confidence knowing quality and safety are guaranteed." },
  { icon: Star, title: "Best Prices", desc: "Transparent pricing with no hidden fees. Compare rates and find the best deals for your budget." },
  { icon: Sparkles, title: "Premium Experience", desc: "Handpicked properties with premium amenities. From cozy lodges to luxurious villas." },
];

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", text: "StayFinder made our family vacation so easy! The villa in Goa was exactly as shown. Will definitely use again.", rating: 5 },
  { name: "Rahul Patel", city: "Bangalore", text: "As a frequent traveler, I love the variety. The booking process is seamless and the properties are top-notch.", rating: 5 },
  { name: "Anitha Kumar", city: "Chennai", text: "Found the perfect lodge for our team retreat. Great prices and the admin dashboard is very useful for tracking.", rating: 5 },
];

const popularCities = [
  { name: "Mumbai", count: 15, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80" },
  { name: "Bangalore", count: 15, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80" },
  { name: "Chennai", count: 15, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80" },
  { name: "Delhi", count: 15, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80" },
  { name: "Jaipur", count: 15, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=80" },
  { name: "Kochi", count: 15, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80" },
];

export default function HomePage() {
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();
  const featured = properties.filter((_, i) => i % 45 === 0).slice(0, 8);

  function handleSearch() {
    navigate(`/properties?search=${encodeURIComponent(heroSearch)}`);
  }

  return (
    <div className="-mt-[64px]">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src={bannerImg} alt="Luxury home" className="absolute inset-0 h-full w-full object-cover scale-105" width={1920} height={800} />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              India's #1 Home Rental Platform
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 font-display text-5xl font-bold tracking-tight text-primary-foreground sm:text-6xl md:text-7xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Find Your
            <span className="block bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
              Perfect Stay
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover premium homes, villas & lodges across 45+ cities in India.
            Book with confidence. Stay with comfort.
          </motion.p>

          {/* Search bar */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mx-auto flex max-w-2xl overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-1 items-center gap-3 px-6">
                <Search className="h-5 w-5 text-primary-foreground/50" />
                <input
                  type="text"
                  placeholder="Search city, property type, or name..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full bg-transparent py-5 text-primary-foreground placeholder:text-primary-foreground/40 outline-none"
                />
              </div>
              <button
                onClick={handleSearch}
                className="m-2 flex items-center gap-2 rounded-xl bg-accent px-8 font-semibold text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-primary-foreground/40">Popular:</span>
              {["Chennai", "Mumbai", "Bangalore", "Delhi"].map((c) => (
                <button
                  key={c}
                  onClick={() => { setHeroSearch(c); navigate(`/properties?search=${c}`); }}
                  className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1 text-xs text-primary-foreground/60 backdrop-blur-sm transition-all hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
                <s.icon className="mx-auto h-5 w-5 text-accent" />
                <p className="mt-2 font-display text-2xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-xs text-primary-foreground/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-10 w-6 rounded-full border-2 border-primary-foreground/30 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-primary-foreground/50 animate-fade-in" />
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="container mx-auto px-4 py-24">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-badge"><TrendingUp className="h-3.5 w-3.5" /> Why Choose Us</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
            Everything You Need for the <span className="text-gradient">Perfect Stay</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We've built the most comprehensive platform for finding and booking rental properties across India.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="group rounded-2xl border bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="gradient-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
                <f.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== POPULAR CITIES ===== */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-badge"><MapPin className="h-3.5 w-3.5" /> Destinations</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
              Explore <span className="text-gradient">Popular Cities</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularCities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/properties?search=${city.name}`}
                  className="group relative block h-56 overflow-hidden rounded-2xl"
                >
                  <img src={city.image} alt={city.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">{city.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-primary-foreground/70">
                      <Building2 className="h-3.5 w-3.5" /> {city.count} properties
                    </p>
                  </div>
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="container mx-auto px-4 py-24">
        <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <span className="section-badge"><Star className="h-3.5 w-3.5" /> Handpicked</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
              Featured <span className="text-gradient">Properties</span>
            </h2>
          </div>
          <Link to="/properties" className="btn-outline text-sm">
            View All Properties <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-badge"><Quote className="h-3.5 w-3.5" /> Testimonials</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
              Loved by <span className="text-gradient">Thousands</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          className="relative overflow-hidden rounded-3xl gradient-primary p-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary-foreground/10 blur-[60px]" />
          <div className="relative z-10">
            <HomeIcon className="mx-auto h-14 w-14 text-primary-foreground animate-float" />
            <h2 className="mt-6 font-display text-4xl font-bold text-primary-foreground sm:text-5xl">
              Ready to List Your Property?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
              Join thousands of property owners. List your home, villa, or lodge and start earning today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-card px-8 py-4 font-semibold text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10">
                Browse Properties
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
