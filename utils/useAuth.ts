'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Only runs on client
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    // Verify token with backend
    (async () => {
      try {
        const res = await fetch("http://172.23.5.77:4000/auth/verify", {
          method: 'POST',            
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.replace("/login");
        }

        setChecking(false);
      } catch {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    })();
  }, [router]);

  return {checking};
}
