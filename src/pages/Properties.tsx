import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import Filters from "@/components/Filters";
import { Building2 } from "lucide-react";

export default function PropertiesPage() {
  const [params] = useSearchParams();
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(params.get("search") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const allProperties = useMemo(() => {
    const custom = JSON.parse(localStorage.getItem("sf_custom_properties") || "[]");
    return [...properties, ...custom];
  }, []);

  const filtered = useMemo(() => {
    return allProperties.filter((p) => {
      if (city && p.city !== city) return false;
      if (propertyType && p.type !== propertyType) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [city, search, minPrice, maxPrice, propertyType]);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="section-badge"><Building2 className="h-3.5 w-3.5" /> Browse</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          Browse <span className="text-gradient">Properties</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Showing <span className="font-semibold text-primary">{filtered.length}</span> properties
        </p>
      </motion.div>
      <div className="mt-8">
        <Filters city={city} setCity={setCity} search={search} setSearch={setSearch} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} propertyType={propertyType} setPropertyType={setPropertyType} />
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.slice(0, 40).map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <Building2 className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <p className="mt-4 text-lg text-muted-foreground">No properties found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
