import { useState, useMemo, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import Filters from "@/components/Filters";
import { Building2, ChevronDown, Map, LayoutGrid } from "lucide-react";

const MapView = lazy(() => import("@/components/MapView"));

const PAGE_SIZE = 24;

export default function PropertiesPage() {
  const [params] = useSearchParams();
  const [city, setCity] = useState(params.get("city") || "");
  const [search, setSearch] = useState(params.get("search") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const allProperties = useMemo(() => {
    const custom = JSON.parse(localStorage.getItem("sf_custom_properties") || "[]");
    return [...properties, ...custom];
  }, []);

  const filtered = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    return allProperties.filter((p) => {
      if (city && p.city !== city) return false;
      if (propertyType && p.type !== propertyType) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [city, search, minPrice, maxPrice, propertyType, allProperties]);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="section-badge"><Building2 className="h-3.5 w-3.5" /> Browse</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
            Browse <span className="text-gradient">Properties</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Showing <span className="font-semibold text-primary">{Math.min(visibleCount, filtered.length)}</span> of{" "}
            <span className="font-semibold">{filtered.length}</span> properties across{" "}
            <span className="font-semibold text-primary">45 cities</span>
          </p>
        </div>
        <div className="flex gap-1 rounded-xl border bg-muted/50 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "grid" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Grid
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "map" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Map className="h-4 w-4" /> Map
          </button>
        </div>
      </motion.div>

      <div className="mt-8">
        <Filters city={city} setCity={setCity} search={search} setSearch={setSearch} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} propertyType={propertyType} setPropertyType={setPropertyType} />
      </div>

      {viewMode === "map" ? (
        <div className="mt-10">
          <Suspense fallback={<div className="flex h-[400px] items-center justify-center rounded-2xl border bg-card"><p className="text-muted-foreground">Loading map…</p></div>}>
            <MapView properties={filtered} selectedCity={city} />
          </Suspense>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, visibleCount).map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <Building2 className="mx-auto h-16 w-16 text-muted-foreground/30" />
              <p className="mt-4 text-lg text-muted-foreground">No properties found matching your filters.</p>
            </div>
          )}
          {visibleCount < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="btn-primary mx-auto"
              >
                Load More <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
