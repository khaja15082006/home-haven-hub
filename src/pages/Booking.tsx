import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import { addBooking, getBookings } from "@/data/bookings";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Bed, Bath, Maximize, CalendarDays, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";

export default function BookingPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!property) return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
      <AlertCircle className="h-16 w-16 text-muted-foreground/30" />
      <p className="mt-4 text-lg text-muted-foreground">Property not found</p>
    </div>
  );

  if (!user) return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
        <CalendarDays className="h-8 w-8 text-primary-foreground" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground">Login Required</h2>
      <p className="mt-2 text-muted-foreground">Please login to book this property</p>
      <button onClick={() => navigate("/login")} className="btn-primary mt-6">Login <ArrowRight className="h-4 w-4" /></button>
    </div>
  );

  const existingBookings = getBookings().filter((b) => b.propertyId === property.id);

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!checkin || !checkout) { setError("Please select both dates"); return; }
    if (checkin >= checkout) { setError("Check-out must be after check-in"); return; }
    const err = addBooking({
      userMobile: user!.mobile,
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
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
      </motion.div>
      <h2 className="mt-6 font-display text-3xl font-bold text-foreground">Booking Confirmed! 🎉</h2>
      <p className="mt-3 text-muted-foreground">{property.title}</p>
      <p className="text-sm text-muted-foreground">{checkin} → {checkout}</p>
      <button onClick={() => navigate("/bookings")} className="btn-primary mt-8">View My Bookings <ArrowRight className="h-4 w-4" /></button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="overflow-hidden rounded-3xl">
            <img src={property.image} alt={property.title} className="h-80 w-full object-cover" />
          </div>
          <h1 className="mt-8 font-display text-3xl font-bold text-foreground">{property.title}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />{property.city}
          </div>
          <div className="mt-5 flex gap-6 rounded-2xl border bg-muted/50 p-4">
            <span className="flex items-center gap-2 text-sm"><Bed className="h-5 w-5 text-primary" />{property.bedrooms} Bedrooms</span>
            <span className="flex items-center gap-2 text-sm"><Bath className="h-5 w-5 text-primary" />{property.bathrooms} Bathrooms</span>
            <span className="flex items-center gap-2 text-sm"><Maximize className="h-5 w-5 text-primary" />{property.area} sqft</span>
          </div>
          <p className="mt-6 font-display text-4xl font-bold text-primary">
            ₹{property.price.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/night</span>
          </p>
          {existingBookings.length > 0 && (
            <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
              <h3 className="font-semibold text-destructive">Already Booked Dates:</h3>
              <div className="mt-2 space-y-1">
                {existingBookings.map((b) => (
                  <p key={b.id} className="text-sm text-destructive/80">🚫 {b.checkin} → {b.checkout}</p>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="sticky top-24 rounded-3xl border bg-card p-8 shadow-card">
            <div className="mb-6 flex items-center gap-3">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <CalendarDays className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl font-bold text-card-foreground">Book This Property</h2>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </motion.p>
            )}
            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Check-in Date</label>
                <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Check-out Date</label>
                <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="input-field" />
              </div>
              {checkin && checkout && checkin < checkout && (
                <div className="rounded-xl bg-primary/5 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nightly rate</span>
                    <span className="font-semibold">₹{property.price.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">{Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000)} nights</span>
                  </div>
                  <div className="mt-3 border-t pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-display text-xl font-bold text-primary">
                      ₹{(property.price * Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000)).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
              <button type="submit" className="btn-primary w-full py-4">
                Confirm Booking <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
