"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export default function InputField({ label, error, icon, type = "text", id, ...props }: InputFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputId = id ?? props.name;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={isPassword && visible ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded-xl border bg-white py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/15 ${
            icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-12" : "pr-4"} ${error ? "border-rose-500" : "border-slate-300"}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
