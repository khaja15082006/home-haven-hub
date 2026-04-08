import { Property } from "@/data/properties";
import { MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/booking/${property.id}`}
        className="group block overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
            {property.type}
          </span>
          <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground opacity-0 transition-all duration-300 hover:bg-destructive hover:text-primary-foreground group-hover:opacity-100">
            <Heart className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="font-display text-2xl font-bold text-primary-foreground drop-shadow-lg">
              ₹{property.price.toLocaleString()}
              <span className="text-sm font-normal opacity-80">/night</span>
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-bold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {property.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {property.city}
          </div>
          <div className="mt-4 flex items-center gap-3 border-t pt-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Bed className="h-3.5 w-3.5" />{property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Bath className="h-3.5 w-3.5" />{property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Maximize className="h-3.5 w-3.5" />{property.area} sqft
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-xl font-bold text-primary">
              ₹{property.price.toLocaleString()}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              Book Now →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
