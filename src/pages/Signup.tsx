import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", mobile: "", aadhaar: "", password: "", role: "buyer" as UserRole });
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.aadhaar || !form.password) {
      setError("All fields are required");
      return;
    }
    const err = register(form);
    if (err) { setError(err); return; }
    navigate("/login");
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md rounded-3xl border bg-card p-10 shadow-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <div className="gradient-primary mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow">
            <UserPlus className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-card-foreground">Create Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Join StayFinder and start booking today</p>
        </div>
        {error && (
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </motion.p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
            <input placeholder="Enter your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Mobile Number</label>
            <input placeholder="Enter mobile number" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Aadhaar Number</label>
            <input placeholder="Enter Aadhaar number" value={form.aadhaar} onChange={(e) => setForm({ ...form, aadhaar: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input type="password" placeholder="Create a password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })} className="input-field">
              <option value="buyer">🏠 Buyer — Browse & book properties</option>
              <option value="seller">📋 Seller — List your properties</option>
              <option value="admin">🔒 Admin — Manage everything</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full py-4">
            Create Account <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
