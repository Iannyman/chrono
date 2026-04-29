'use client'

import { useAuth } from "@/utils/useAuth";
import { Suspense } from "react";

export default function HomePage() {
  const {checking} = useAuth();

  if (checking) {
    return (
      <div className="bg-gray-900 w-full">
        <Suspense/>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 w-full">
      <h1>Auth Page</h1>
    </div>
  );
}
