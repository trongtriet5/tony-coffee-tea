"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Employee } from "@/types";

/**
 * Shared hook to get the current authenticated user.
 * Reads from localStorage and redirects to /login if not found.
 * Re-evaluates whenever the URL route changes.
 */
export function useCurrentUser(redirectIfUnauthenticated = true): Employee | null {
  const [user, setUser] = useState<Employee | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      if (redirectIfUnauthenticated) {
        router.push("/login");
      }
      return;
    }
    try {
      setUser(JSON.parse(userStr));
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (redirectIfUnauthenticated) {
        router.push("/login");
      }
    }
  }, [redirectIfUnauthenticated, router]);

  return user;
}

/**
 * Helper: check if current user has one of the given roles.
 */
export function useHasRole(...roles: Employee["role"][]): boolean {
  const user = useCurrentUser(false);
  if (!user) return false;
  return roles.map(r => r.toUpperCase()).includes(user.role?.toUpperCase() as Employee["role"]);
}
