import { Property } from "@/data/properties";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to={`/booking/${property.id}`}
      className="group block overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {property.type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-1">
          {property.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {property.city}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{property.bedrooms} Beds</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms} Baths</span>
          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{property.area} sqft</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary">
            ₹{property.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">/night</span>
        </div>
      </div>
    </Link>
  );
}
