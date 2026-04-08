import { allCities } from "@/data/properties";
import { Search, SlidersHorizontal } from "lucide-react";

interface FiltersProps {
  city: string;
  setCity: (c: string) => void;
  search: string;
  setSearch: (s: string) => void;
  minPrice: string;
  setMinPrice: (s: string) => void;
  maxPrice: string;
  setMaxPrice: (s: string) => void;
  propertyType: string;
  setPropertyType: (s: string) => void;
}

export default function Filters({
  city, setCity, search, setSearch,
  minPrice, setMinPrice, maxPrice, setMaxPrice,
  propertyType, setPropertyType,
}: FiltersProps) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h3 className="font-display font-semibold text-card-foreground">Filters</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Cities</option>
          {allCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">All Types</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Lodge">Lodge</option>
        </select>
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
    </div>
  );
}
