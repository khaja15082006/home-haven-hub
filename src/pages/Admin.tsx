import { useAuth } from "@/context/AuthContext";
import { getBookings, getMessages } from "@/data/bookings";
import { motion } from "framer-motion";
import { Shield, Users, Home, Mail, TrendingUp, CalendarDays } from "lucide-react";

export default function AdminPage() {
  const { user, allUsers } = useAuth();
  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <Shield className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">Admin Access Only</h2>
        <p className="mt-2 text-muted-foreground">You need admin privileges to view this page</p>
      </div>
    );
  }

  const bookings = getBookings();
  const messages = getMessages();

  const statCards = [
    { icon: Users, label: "Total Users", count: allUsers.length, color: "from-blue-500 to-cyan-500" },
    { icon: Home, label: "Total Bookings", count: bookings.length, color: "from-violet-500 to-purple-500" },
    { icon: Mail, label: "Messages", count: messages.length, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="section-badge"><Shield className="h-3.5 w-3.5" /> Dashboard</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.color} p-7 text-primary-foreground`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-foreground/10" />
            <s.icon className="h-8 w-8" />
            <p className="mt-3 font-display text-4xl font-bold">{s.count}</p>
            <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Users */}
      <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Users className="h-5 w-5 text-primary" /> Registered Users
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Name</th>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Mobile</th>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.mobile} className="border-t transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4 font-medium">{u.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{u.mobile}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      u.role === "admin" ? "bg-purple-100 text-purple-700" :
                      u.role === "seller" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
              {allUsers.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-8 text-center text-muted-foreground">No users registered yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bookings */}
      <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <CalendarDays className="h-5 w-5 text-primary" /> All Bookings
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Property</th>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">User</th>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Dates</th>
                <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4 font-medium">{b.propertyTitle}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.userMobile}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.checkin} → {b.checkout}</td>
                  <td className="px-5 py-4 font-semibold text-primary">₹{b.price.toLocaleString()}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">No bookings yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Messages */}
      <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Mail className="h-5 w-5 text-primary" /> Contact Messages
        </h2>
        <div className="mt-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="rounded-2xl border bg-card p-6 shadow-card transition-all hover:shadow-card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{new Date(m.date).toLocaleDateString()}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-center py-8 text-muted-foreground">No messages yet</p>}
        </div>
      </motion.div>
    </div>
  );
}
