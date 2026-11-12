
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Backend Status", href: "/backend-status" },
  { label: "Home", href: "/" },
];

export default function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">

      {/* Application Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-teal-700"
      >
        MediSense AI
      </Link>

      <p className="mt-1 text-xs text-slate-500">
        Healthcare Information Assistant
      </p>

      {/* Navigation Menu */}
      <nav
        aria-label="Main navigation"
        className="mt-6 flex flex-wrap gap-2 md:flex-col"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Clerk User Account Section */}
      <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
        <UserButton />

        <span className="text-sm text-slate-600">
          My Account
        </span>
      </div>

      {/* Development Information */}
      <div className="mt-8 rounded-xl bg-teal-50 p-4">
        <p className="text-sm font-semibold text-teal-800">
          Development Mode
        </p>

        <p className="mt-2 text-xs text-teal-700">
          AI integration and subscription features
          will be added in upcoming phases.
        </p>
      </div>

    </aside>
  );
}
