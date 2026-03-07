// src/lib/auth.api.ts
import {api} from "./api";

export async function getUser() {
    try {
        const res = await api.get("/users/profile");
        return res.data;
    } catch (error: any) {
        console.log("[getUser] Failed:", error.response?.data || error.message);
        return null;
    }
}

export async function loginUser(data: { email: string; password: string }) {
    return api.post("/auth/login", data);
}

export async function registerUser(data: { email: string; password: string }) {
    return api.post("/auth/register", data);
}