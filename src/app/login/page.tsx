'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    console.log("email: ", email);
    console.log("password: ", password);
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Branding/Marketing */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mt-6">Welcome Back!</h1>
        <p className="mt-4 text-lg text-center">
          Sign in to continue and access your dashboard.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center px-6 py-12">
        <div className="max-w-md w-full">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <div className="mt-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            {/* OAuth Login Buttons */}
            <div className="mt-6 flex flex-col space-y-4">
              <button
                onClick={() => signIn("github")}
                className="flex w-full justify-center rounded-md bg-gray-900 px-4 py-2 text-white font-semibold shadow-md hover:bg-gray-700"
              >
                Sign in with GitHub
              </button>
              <button
                onClick={() => signIn("google")}
                className="flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-red-500"
              >
                Sign in with Google
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Not a member?{' '}
              <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
