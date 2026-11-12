
"use client";

import { FormEvent, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import AuthTest from "@/components/dashboard/AuthTest";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = message.trim();

    if (!text) return;

    setMessages((previous) => [...previous, text]);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <main className="min-w-0 flex-1 p-6">

        <h1 className="text-3xl font-bold">
          MediSense AI Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Your AI healthcare assistant workspace
        </p>

        {/* AI Chat Section */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            AI Health Assistant
          </h2>

          <div className="mt-6 min-h-64 space-y-3">
            {messages.length === 0 ? (
              <p className="text-slate-500">
                Start a conversation below.
              </p>
            ) : (
              messages.map((text, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-teal-50 p-3 text-teal-900"
                >
                  {text}
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            className="mt-6 flex gap-3"
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask a general health question..."
              className="min-w-0 flex-1 rounded-lg border border-slate-300 p-3"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-500">
            Demo only. AI responses are not enabled yet.
            Do not enter private medical information.
          </p>

        </section>

        {/* Clerk + FastAPI Authentication Test */}
        <AuthTest />

      </main>
    </div>
  );
}
