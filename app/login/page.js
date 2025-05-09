"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Using next-auth's signIn function
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust imports based on your UI library
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Sending credentials to NextAuth API route (in app/api/auth/[...nextauth]/route.js)
    const res = await signIn("credentials", {
      redirect: false,
      email: trimmedEmail,
      password: trimmedPassword,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/pages/dashboard"); // Redirect to dashboard after successful login
    }
  };

  return (
    <div className=' min-h-screen flex items-center justify-center '>
    <div className="max-w-md w-full mx-auto p-6 border rounded-lg ">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
    </div>
  );
}
