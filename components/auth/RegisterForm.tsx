"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";
import AuthShell from "./AuthShell";
import InputField from "./InputField";
import type { RegisterFormValues } from "@/types";

interface RegisterFormProps {
  onSubmit?: (values: RegisterFormValues) => void | Promise<void>;
}

type Errors = Partial<Record<keyof RegisterFormValues, string>>;

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [values, setValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const update = (field: keyof RegisterFormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [field]: e.target.value });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.password.length < 8) next.password = "Use at least 8 characters.";
    if (values.confirmPassword !== values.password) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await onSubmit?.(values); // connect your API here later
    setLoading(false);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-teal-800 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <InputField
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Muhammad Ubaid"
          icon={<User size={18} />}
          value={values.name}
          onChange={update("name")}
          error={errors.name}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Mail size={18} />}
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          icon={<Lock size={18} />}
          value={values.password}
          onChange={update("password")}
          error={errors.password}
        />
        <InputField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          icon={<Lock size={18} />}
          value={values.confirmPassword}
          onChange={update("confirmPassword")}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-teal-800 py-3 font-semibold text-white transition hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
