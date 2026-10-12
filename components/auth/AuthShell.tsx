import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-teal-900 p-12 text-teal-50 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-900">
            <MessageCircle size={20} />
          </span>
          Talkly
        </div>

        {/* Fake conversation preview */}
        <div className="mx-auto w-full max-w-sm space-y-3">
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-teal-800 px-4 py-3 text-sm">
            Are we still on for the demo today?
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-teal-50 px-4 py-3 text-sm text-teal-950">
            Yes! Sharing my screen in five minutes.
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-teal-800 px-4 py-3 text-sm">
            Perfect. See you there.
          </div>
        </div>

        <div>
          <h2 className="max-w-md text-3xl font-semibold leading-tight">
            Keep every conversation in one calm place.
          </h2>
          <p className="mt-3 max-w-md text-teal-200">
            Message your team, friends and family without the noise.
          </p>
        </div>

        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-800/60"
          aria-hidden="true"
        />
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 text-lg font-semibold text-teal-900 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-900 text-white">
              <MessageCircle size={20} />
            </span>
            Talkly
          </div>

          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-2 text-slate-600">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-slate-600">{footer}</p>
        </div>
      </main>
    </div>
  );
}
