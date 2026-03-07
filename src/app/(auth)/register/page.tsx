'use client';

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {registerUser} from "@/lib/auth.api";

const signupSchema = z.object({
    username: z.string().min(4, { message: "Invalid username." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        try {
            await registerUser(data);
            router.push("/login");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="username" {...register("username")} />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
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
            {/* Add more fields as needed */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
        </form>
    );
}