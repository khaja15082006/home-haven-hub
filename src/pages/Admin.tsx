import { useAuth } from "@/context/AuthContext";
import { getBookings, getMessages } from "@/data/bookings";
import { Shield, Users, Home, Mail } from "lucide-react";

export default function AdminPage() {
  const { user, allUsers } = useAuth();
  if (!user || user.role !== "admin") {
    return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Admin access only</div>;
  }

  const bookings = getBookings();
  const messages = getMessages();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Users, label: "Total Users", count: allUsers.length },
          { icon: Home, label: "Total Bookings", count: bookings.length },
          { icon: Mail, label: "Messages", count: messages.length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-6 shadow-card">
            <s.icon className="h-8 w-8 text-primary" />
            <p className="mt-2 font-display text-3xl font-bold text-card-foreground">{s.count}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Users */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-foreground">Registered Users</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mobile</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.mobile} className="border-t">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.mobile}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bookings */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-foreground">All Bookings</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Property</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Dates</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-3">{b.propertyTitle}</td>
                  <td className="px-4 py-3">{b.userMobile}</td>
                  <td className="px-4 py-3">{b.checkin} → {b.checkout}</td>
                  <td className="px-4 py-3">₹{b.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Messages */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-foreground">Contact Messages</h2>
        <div className="mt-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-card-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{m.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-muted-foreground">No messages yet</p>}
        </div>
      </div>
    </div>
  );
}
