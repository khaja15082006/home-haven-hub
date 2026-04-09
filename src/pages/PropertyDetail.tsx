import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { properties, Property } from "@/data/properties";
import { addBooking, getBookings } from "@/data/bookings";
import { useAuth } from "@/context/AuthContext";
import PropertyCard from "@/components/PropertyCard";
import {
  MapPin, Bed, Bath, Maximize, CalendarDays, CheckCircle, ArrowRight,
  AlertCircle, Heart, Share2, Star, Wifi, Car, Utensils, Wind,
  Tv, Shield, Waves, TreePine, ChevronLeft, ImageIcon,
} from "lucide-react";

const amenitiesList = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Parking" },
  { icon: Utensils, label: "Kitchen" },
  { icon: Wind, label: "Air Conditioning" },
  { icon: Tv, label: "Smart TV" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: TreePine, label: "Garden" },
];

function getPropertyImages(property: Property): string[] {
  const baseImages: Record<string, string[]> = {
    House: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=900&q=80",
    ],
    Villa: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
    ],
    Lodge: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
    ],
  };
  return [property.image, ...(baseImages[property.type] || baseImages.House).filter(img => img !== property.image)];
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const images = useMemo(() => property ? getPropertyImages(property) : [], [property]);

  const similarProperties = useMemo(() => {
    if (!property) return [];
    return properties
      .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
      .slice(0, 4);
  }, [property]);

  if (!property) return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
      <AlertCircle className="h-16 w-16 text-muted-foreground/30" />
      <p className="mt-4 text-lg text-muted-foreground">Property not found</p>
    </div>
  );

  const existingBookings = getBookings().filter((b) => b.propertyId === property.id);
  const nights = checkin && checkout && checkin < checkout
    ? Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000)
    : 0;
  // Pick amenities deterministically based on property
  const propAmenities = amenitiesList.filter((_, i) => {
    const hash = property.id.charCodeAt(0) + property.id.charCodeAt(property.id.length - 1);
    return (hash + i) % 3 !== 0;
  });

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    if (!checkin || !checkout) { setError("Please select both dates"); return; }
    if (checkin >= checkout) { setError("Check-out must be after check-in"); return; }
    const err = addBooking({
      userMobile: user.mobile,
      propertyId: property!.id,
      propertyTitle: property!.title,
      city: property!.city,
      price: property!.price,
      checkin,
      checkout,
    });
    if (err) { setError(err); return; }
    setSuccess(true);
  }

  if (success) return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
      </motion.div>
      <h2 className="mt-6 font-display text-3xl font-bold text-foreground">Booking Confirmed! 🎉</h2>
      <p className="mt-3 text-muted-foreground">{property.title}</p>
      <p className="text-sm text-muted-foreground">{checkin} → {checkout}</p>
      <p className="mt-2 font-display text-2xl font-bold text-primary">₹{(property.price * nights).toLocaleString()}</p>
      <button onClick={() => navigate("/bookings")} className="btn-primary mt-8">View My Bookings <ArrowRight className="h-4 w-4" /></button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/properties" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" /> Properties
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{property.title}</span>
      </motion.div>

      {/* Image Gallery */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
            <img
              src={images[activeImage]}
              alt={property.title}
              className="h-[300px] w-full object-cover lg:h-[460px] transition-all duration-500"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                  liked ? "bg-destructive text-primary-foreground" : "bg-card/70 text-muted-foreground hover:bg-card"
                }`}
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card/70 backdrop-blur-md text-muted-foreground hover:bg-card transition-all">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-lg">
              {property.type}
            </span>
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 backdrop-blur-md">
              <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{activeImage + 1}/{images.length}</span>
            </div>
          </div>
          <div className="hidden lg:grid grid-rows-3 gap-3">
            {images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i + 1)}
                className={`overflow-hidden rounded-2xl border-2 transition-all ${
                  activeImage === i + 1 ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-primary/30"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        {/* Thumbnail strip for mobile */}
        <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                activeImage === i ? "border-primary ring-2 ring-primary/30" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="h-16 w-20 object-cover" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="grid gap-10 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {/* Title & location */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">{property.title}</h1>
                <div className="mt-2 flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{property.city}, India</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.8</span>
                  <span className="text-sm">(42 reviews)</span>
                </div>
              </div>
              <p className="text-right">
                <span className="font-display text-3xl font-bold text-primary">₹{property.price.toLocaleString()}</span>
                <span className="block text-sm text-muted-foreground">per night</span>
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Bed, label: "Bedrooms", value: property.bedrooms },
              { icon: Bath, label: "Bathrooms", value: property.bathrooms },
              { icon: Maximize, label: "Area", value: `${property.area} sqft` },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 rounded-2xl border bg-muted/30 p-4">
                <s.icon className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-bold text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">About This Property</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Welcome to this stunning {property.type.toLowerCase()} located in the heart of {property.city}.
              This beautifully designed property offers {property.bedrooms} spacious bedrooms and {property.bathrooms} modern
              bathrooms, spanning {property.area} square feet of living space. Enjoy premium amenities, a prime
              location, and an unforgettable stay experience. Perfect for families, couples, or groups
              looking for comfort and style during their visit to {property.city}.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The property features modern interiors with carefully curated furnishings, natural
              lighting throughout, and a peaceful neighborhood. Whether you're visiting for business
              or leisure, this {property.type.toLowerCase()} provides the ideal home base to explore everything
              {" "}{property.city} has to offer.
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {propAmenities.map((a) => (
                <div key={a.label} className="flex items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/30">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <a.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booked dates */}
          {existingBookings.length > 0 && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
              <h3 className="font-semibold text-destructive">Already Booked Dates</h3>
              <div className="mt-2 space-y-1">
                {existingBookings.map((b) => (
                  <p key={b.id} className="text-sm text-destructive/80">🚫 {b.checkin} → {b.checkout}</p>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Booking form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="sticky top-24 rounded-3xl border bg-card p-6 shadow-card lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <CalendarDays className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl font-bold text-card-foreground">Book Now</h2>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </motion.p>
            )}
            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Check-in</label>
                <input type="date" value={checkin} onChange={(e) => { setCheckin(e.target.value); setError(""); }} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Check-out</label>
                <input type="date" value={checkout} onChange={(e) => { setCheckout(e.target.value); setError(""); }} className="input-field" />
              </div>
              {nights > 0 && (
                <div className="rounded-xl bg-primary/5 p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹{property.price.toLocaleString()} × {nights} nights</span>
                    <span className="font-semibold">₹{(property.price * nights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="font-semibold">₹{Math.round(property.price * nights * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-display text-xl font-bold text-primary">
                      ₹{Math.round(property.price * nights * 1.05).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
              <button type="submit" className="btn-primary w-full py-4">
                {user ? "Confirm Booking" : "Login to Book"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Similar properties */}
      {similarProperties.length > 0 && (
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl font-bold text-foreground">Similar Properties</h2>
          <p className="mt-1 text-muted-foreground">More stays you might love in {property.city}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
