"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/tools");
    }
  }, [status, router]);

  const handleEmailAuth = async (e) => {
  e.preventDefault();

  if (mode === "signup") {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Signup failed");
      return;
    }
  }

  const result = await signIn("credentials", {
    email,
    password,
    callbackUrl: "/tools",
    redirect: false,
  });

  if (result?.error) {
    alert("Wrong email or password");
    return;
  }

  window.location.href = result?.url || "/tools";
};

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/tools",
      redirect: false,
    });

    if (result?.error) {
      alert("Wrong email or password");
    return;
    }

    window.location.href = result?.url || "/tools";
  };

  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          {mode === "signup" ? "Create account" : "Sign in"}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Continue with Google or your email.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/tools" })}
            className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
          >
            Continue with Google
          </button>
        </div>

        <div className="my-6 text-center text-sm text-slate-400">or</div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            {mode === "signup" ? "Sign up with email" : "Sign in with email"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="mt-5 w-full text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}