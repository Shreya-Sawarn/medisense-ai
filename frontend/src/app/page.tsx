
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-400">
          Healthcare AI Platform
        </p>

        <h1 className="text-5xl font-bold md:text-6xl">
          Welcome to MediSense AI
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Your intelligent healthcare information assistant.
          Explore health-related questions with AI-powered
          educational guidance.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-xl bg-teal-500 px-6 py-3 font-semibold text-slate-950 hover:bg-teal-400"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}
