
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

// This route requires authentication,
// so it cannot guarantee instant navigation.
export const instant = false;

type DashboardLayoutProps = {
  children: ReactNode;
};

async function ProtectedDashboard({
  children,
}: DashboardLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading dashboard...</p>
        </div>
      }
    >
      <ProtectedDashboard>
        {children}
      </ProtectedDashboard>
    </Suspense>
  );
}
