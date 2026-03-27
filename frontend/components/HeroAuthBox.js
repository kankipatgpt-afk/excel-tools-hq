"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroAuthBox() {
  const { data: session } = useSession();
  const router = useRouter();

  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    if (mode === "signup") {
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const signupData = await signupRes.json();

      if (!signupRes.ok) {
        alert(signupData.error || "Signup failed");
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Wrong email or password");
      return;
    }

    router.push("/tools");
    router.refresh();
  };

  if (session?.user) {
    return (
      <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <p className="text-sm text-slate-500">Logged in as</p>
        <p className="mt-1 text-lg font-semibold text-slate-900">
          {session.user.name || session.user.email}
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => router.push("/tools")}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Go to tools
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => signIn("google", { callbackUrl: "/tools" })}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          Google
        </button>

        <button
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          {mode === "signup" ? "Use sign in" : "Use email"}
        </button>
      </div>

      <form onSubmit={handleEmailAuth} className="mt-4 grid gap-3 sm:grid-cols-3">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
        />

        <button
          type="submit"
          className="sm:col-span-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {mode === "signup" ? "Create account" : "Sign in with email"}
        </button>
      </form>
    </div>
  );
}