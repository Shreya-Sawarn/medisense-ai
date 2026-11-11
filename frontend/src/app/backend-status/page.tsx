
"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
  message: string;
};

export default function BackendStatusPage() {
  const [result, setResult] = useState("Connecting...");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend unavailable");
        }

        return response.json() as Promise<HealthResponse>;
      })
      .then((data) => {
        setResult(data.message);
      })
      .catch(() => {
        setResult("Backend connection failed");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">
        MediSense AI
      </h1>

      <h2 className="text-xl">
        Backend Connection Test
      </h2>

      <p role="status">{result}</p>
    </main>
  );
}
