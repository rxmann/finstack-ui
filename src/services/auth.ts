import { api } from "@/lib/api";

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const register = (data: any) => api.post("/auth/register", data);

export const getProfile = () => api.get("/users/profile");
