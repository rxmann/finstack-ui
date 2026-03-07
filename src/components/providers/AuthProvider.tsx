"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        router.replace("/login"); // redirect if not authenticated
      })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}
