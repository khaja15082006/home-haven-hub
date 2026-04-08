import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Home, Search, LogIn, UserPlus, PlusCircle, History, Shield, Mail, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { to: "/", label: "Home", icon: Home, show: true },
    { to: "/properties", label: "Properties", icon: Search, show: true },
    { to: "/login", label: "Login", icon: LogIn, show: !user },
    { to: "/signup", label: "Sign Up", icon: UserPlus, show: !user },
    { to: "/add-property", label: "Add Property", icon: PlusCircle, show: !!user && (user.role === "seller" || user.role === "admin") },
    { to: "/bookings", label: "My Bookings", icon: History, show: !!user },
    { to: "/contact", label: "Contact", icon: Mail, show: true },
    { to: "/admin", label: "Admin", icon: Shield, show: !!user && user.role === "admin" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b bg-card/90 backdrop-blur-xl shadow-card" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Stay<span className="text-gradient">Finder</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.filter((l) => l.show).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                location.pathname === l.to
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
          {user && (
            <>
              <div className="mx-2 h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        <button className="rounded-xl p-2 transition-colors hover:bg-muted md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t bg-card/95 backdrop-blur-xl px-4 pb-4 md:hidden">
          {user && (
            <div className="flex items-center gap-3 border-b py-4 mb-2">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-card-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          )}
          {links.filter((l) => l.show).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                location.pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="mt-2 flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
