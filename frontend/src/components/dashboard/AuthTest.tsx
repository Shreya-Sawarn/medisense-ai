
"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export default function AuthTest() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyAuthentication() {
    setLoading(true);
    setResult("Verifying authentication...");

    try {
      const token = await getToken();

      if (!token) {
        setResult("No Clerk session token found.");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        setResult("NEXT_PUBLIC_API_URL is missing.");
        return;
      }

      const response = await fetch(
        `${apiUrl}/api/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setResult(
          `Authentication failed. HTTP ${response.status}`
        );
        return;
      }

      const data: {
        authenticated: boolean;
        user_id: string;
      } = await response.json();

      setResult(
        data.authenticated
          ? "Authentication successful! FastAPI verified your Clerk session."
          : "Unexpected authentication response."
      );
    } catch (error) {
      setResult(
        error instanceof Error
          ? `Connection error: ${error.message}`
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Backend Authentication Test
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Verify your Clerk session with the FastAPI backend.
      </p>

      <button
        type="button"
        onClick={verifyAuthentication}
        disabled={!isLoaded || !isSignedIn || loading}
        className="mt-5 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Clerk Authentication"}
      </button>

      {!isLoaded && (
        <p className="mt-3 text-sm">
          Loading Clerk authentication...
        </p>
      )}

      {isLoaded && !isSignedIn && (
        <p className="mt-3 text-sm text-red-600">
          Please sign in to verify authentication.
        </p>
      )}

      <p role="status" className="mt-4 text-sm text-slate-700">
        {result}
      </p>
    </section>
  );
}
