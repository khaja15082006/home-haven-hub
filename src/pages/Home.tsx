import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, MapPin, Star, Shield, Home as HomeIcon } from "lucide-react";
import bannerImg from "@/assets/banner.jpg";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

const features = [
  { icon: Search, title: "Easy Search", desc: "Find properties across 45+ cities with smart filters" },
  { icon: Shield, title: "Verified Listings", desc: "All properties are verified for quality & safety" },
  { icon: Star, title: "Best Prices", desc: "Competitive rates with no hidden charges" },
  { icon: MapPin, title: "Prime Locations", desc: "Properties in the most sought-after neighborhoods" },
];

export default function HomePage() {
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();

  const featured = properties.filter((_, i) => i % 45 === 0).slice(0, 8);

  function handleSearch() {
    navigate(`/properties?search=${encodeURIComponent(heroSearch)}`);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <img src={bannerImg} alt="Luxury home" className="absolute inset-0 h-full w-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl animate-fade-in">
            Find Your Perfect Stay
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Discover homes, villas & lodges across 45+ cities in India
          </p>
          <div className="mt-8 flex animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex w-full max-w-xl mx-auto overflow-hidden rounded-xl border-2 border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-md">
              <input
                type="text"
                placeholder="Search city or property..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent px-5 py-4 text-primary-foreground placeholder:text-primary-foreground/50 outline-none"
              />
              <button
                onClick={handleSearch}
                className="gradient-primary m-1.5 flex items-center gap-2 rounded-lg px-6 font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-center text-3xl font-bold text-foreground">Why StayFinder?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="gradient-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Properties</h2>
            <Link to="/properties" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="gradient-primary rounded-2xl p-12">
          <HomeIcon className="mx-auto h-12 w-12 text-primary-foreground" />
          <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground">Ready to List Your Property?</h2>
          <p className="mt-2 text-primary-foreground/80">Join as a seller and reach thousands of potential tenants</p>
          <Link
            to="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3 font-semibold text-primary transition hover:bg-card/90"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
