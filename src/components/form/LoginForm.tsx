'use client'; // Client component for hooks

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {loginUser} from "@/lib/auth.api";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await loginUser(data);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            // Add toast.error("Invalid credentials") if you have toast setup
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}