import { useAuth } from "@/context/AuthContext";
import { getBookings } from "@/data/bookings";
import { motion } from "framer-motion";
import { History, CalendarDays, MapPin, Package } from "lucide-react";

export default function BookingsPage() {
  const { user } = useAuth();
  if (!user) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Please login to view bookings</div>;

  const bookings = getBookings().filter((b) => b.userMobile === user.mobile);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="section-badge"><History className="h-3.5 w-3.5" /> History</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          My <span className="text-gradient">Bookings</span>
        </h1>
      </motion.div>

      {bookings.length === 0 ? (
        <div className="py-24 text-center">
          <Package className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <p className="mt-4 text-lg text-muted-foreground">No bookings yet. Start exploring properties!</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b, i) => (
            <motion.div
              key={b.id}
              className="rounded-2xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-card-foreground">{b.propertyTitle}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />{b.city}
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Confirmed</span>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                {b.checkin} → {b.checkout}
              </div>
              <p className="mt-4 font-display text-2xl font-bold text-primary">₹{b.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
