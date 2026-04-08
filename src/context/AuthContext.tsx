import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "buyer" | "seller" | "admin";

export interface AppUser {
  name: string;
  mobile: string;
  aadhaar: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: AppUser | null;
  login: (mobile: string, password: string) => string | null;
  register: (user: AppUser) => string | null;
  logout: () => void;
  allUsers: AppUser[];
}

const AuthContext = createContext<AuthContextType | null>(null);

function getUsers(): AppUser[] {
  const data = localStorage.getItem("sf_users");
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: AppUser[]) {
  localStorage.setItem("sf_users", JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sf_current_user");
    if (stored) setUser(JSON.parse(stored));
    setAllUsers(getUsers());
  }, []);

  function register(newUser: AppUser): string | null {
    const users = getUsers();
    if (users.find((u) => u.mobile === newUser.mobile)) {
      return "Mobile number already registered";
    }
    users.push(newUser);
    saveUsers(users);
    setAllUsers(users);
    return null;
  }

  function login(mobile: string, password: string): string | null {
    const users = getUsers();
    const found = users.find((u) => u.mobile === mobile && u.password === password);
    if (!found) return "Invalid credentials";
    localStorage.setItem("sf_current_user", JSON.stringify(found));
    setUser(found);
    return null;
  }

  function logout() {
    localStorage.removeItem("sf_current_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, allUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
