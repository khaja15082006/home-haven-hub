import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import Filters from "@/components/Filters";

export default function PropertiesPage() {
  const [params] = useSearchParams();
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(params.get("search") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (city && p.city !== city) return false;
      if (propertyType && p.type !== propertyType) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [city, search, minPrice, maxPrice, propertyType]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Browse Properties</h1>
      <p className="mt-1 text-muted-foreground">Showing {filtered.length} properties</p>
      <div className="mt-6">
        <Filters city={city} setCity={setCity} search={search} setSearch={setSearch} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} propertyType={propertyType} setPropertyType={setPropertyType} />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.slice(0, 40).map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">No properties found matching your filters.</div>
      )}
    </div>
  );
}
