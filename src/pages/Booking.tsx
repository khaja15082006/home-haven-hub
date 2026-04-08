import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { properties } from "@/data/properties";
import { addBooking, getBookings } from "@/data/bookings";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Bed, Bath, Maximize, CalendarDays, CheckCircle } from "lucide-react";

export default function BookingPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!property) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Property not found</div>;

  if (!user) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground">Please login to book this property</p>
      <button onClick={() => navigate("/login")} className="gradient-primary mt-4 rounded-lg px-6 py-2 text-primary-foreground">Login</button>
    </div>
  );

  const existingBookings = getBookings().filter((b) => b.propertyId === property.id);

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!checkin || !checkout) { setError("Please select dates"); return; }
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
      <CheckCircle className="h-16 w-16 text-green-500" />
      <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Booking Confirmed!</h2>
      <p className="mt-2 text-muted-foreground">{property.title} — {checkin} to {checkout}</p>
      <button onClick={() => navigate("/bookings")} className="gradient-primary mt-6 rounded-lg px-6 py-3 text-primary-foreground">View My Bookings</button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img src={property.image} alt={property.title} className="h-80 w-full rounded-2xl object-cover" />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">{property.title}</h1>
          <div className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{property.city}</div>
          <div className="mt-4 flex gap-6">
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Bed className="h-4 w-4" />{property.bedrooms} Beds</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Bath className="h-4 w-4" />{property.bathrooms} Baths</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Maximize className="h-4 w-4" />{property.area} sqft</span>
          </div>
          <p className="mt-4 font-display text-3xl font-bold text-primary">₹{property.price.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/night</span></p>
          {existingBookings.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-foreground">Already Booked Dates:</h3>
              <div className="mt-2 space-y-1">
                {existingBookings.map((b) => (
                  <p key={b.id} className="text-sm text-destructive">{b.checkin} → {b.checkout}</p>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <div className="mb-6 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-card-foreground">Book This Property</h2>
          </div>
          {error && <p className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Check-in Date</label>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Check-out Date</label>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button type="submit" className="gradient-primary w-full rounded-lg py-3 font-semibold text-primary-foreground transition hover:opacity-90">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}
