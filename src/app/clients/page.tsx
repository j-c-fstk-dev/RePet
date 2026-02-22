"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data } = await supabase
      .from("clients")
      .select("*")
      .eq("profile_id", userData.user.id)
      .order("created_at", { ascending: false });

    setClients(data || []);
    setLoading(false);
  };

  const createClient = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    await supabase.from("clients").insert([
      {
        name,
        phone,
        profile_id: userData.user.id,
      },
    ]);

    setName("");
    setPhone("");
    await loadClients();
  };

  if (loading) {
    return <div className="p-10">Carregando clientes...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Clientes</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h3 className="font-semibold mb-4">Novo Cliente</h3>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <button
            onClick={createClient}
            className="bg-black text-white px-6 rounded-lg"
          >
            Criar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/clients/${client.id}`}            className="bg-white p-6 rounded-xl shadow-sm border block hover:shadow-md transition"
          >
            <h4 className="font-bold text-lg">{client.name}</h4>
            <p className="text-gray-500 mt-2">{client.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}