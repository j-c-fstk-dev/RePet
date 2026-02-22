"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) => {
    const base =
      "block px-4 py-2 rounded-lg transition";

    const active = "bg-black text-white";
    const inactive = "text-gray-600 hover:bg-gray-200";

    return pathname === path
      ? base + " " + active
      : base + " " + inactive;
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">Repet</h1>

      <nav className="space-y-3">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link href="/clients" className={linkClass("/clients")}>
          Clientes
        </Link>
      </nav>
    </aside>
  );
}