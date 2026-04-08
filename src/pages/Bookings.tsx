import { useAuth } from "@/context/AuthContext";
import { getBookings } from "@/data/bookings";
import { History, CalendarDays } from "lucide-react";

export default function BookingsPage() {
  const { user } = useAuth();
  if (!user) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Please login to view bookings</div>;

  const bookings = getBookings().filter((b) => b.userMobile === user.mobile);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2">
        <History className="h-6 w-6 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">My Bookings</h1>
      </div>
      {bookings.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">No bookings yet</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-xl border bg-card p-5 shadow-card">
              <h3 className="font-display font-semibold text-card-foreground">{b.propertyTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.city}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {b.checkin} → {b.checkout}
              </div>
              <p className="mt-2 font-display text-lg font-bold text-primary">₹{b.price.toLocaleString()}/night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
