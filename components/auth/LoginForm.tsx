"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import AuthShell from "./AuthShell";
import InputField from "./InputField";
import type { LoginFormValues } from "@/types";
import axios from "../../utils/axios"

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
// console.log(process.env.BASE_URL)
    console.log(values)
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // await onSubmit?.(values); // connect your API here later
    try {
      setLoading(true);
      const data  = await axios.post("/login",values)

      console.log(data)

    } catch (error) {
      
      console.log(error.message)
    }finally{

      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={
        <>
          New here?{" "}
          <Link href="/register" className="font-semibold text-teal-800 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <InputField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Mail size={18} />}
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-700">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={(e) => setValues({ ...values, remember: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 accent-teal-800"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium text-teal-800 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal-800 py-3 font-semibold text-white transition hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}
