"use client";

import { signOut } from "@/lib/auth";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6">
      <button
        onClick={signOut}
        className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
      >
        Sair
      </button>
    </header>
  );
}
