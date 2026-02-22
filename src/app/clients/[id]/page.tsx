"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ClientDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [client, setClient] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [productName, setProductName] = useState("");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
  setLoading(true);

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    setLoading(false);
    return;
  }

  const { data: clientData } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("profile_id", userData.user.id) // 🔥 IMPORTANTE
    .single();

  const { data: productsData } = await supabase
    .from("recurring_products")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  setClient(clientData);
  setProducts(productsData || []);
  setLoading(false);
};

    fetchData();
  }, [id]);

  const createProduct = async () => {
  if (!productName) return;

  const nextReminder = new Date();
  nextReminder.setDate(nextReminder.getDate() + duration);

  await supabase.from("recurring_products").insert([
    {
      client_id: id,
      name: productName,
      duration_days: duration,
      next_reminder_date: nextReminder.toISOString(),
    },
  ]);

  setProductName("");
  setDuration(30);

  // 🔥 Recarrega os produtos manualmente
  const { data } = await supabase
    .from("recurring_products")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  setProducts(data || []);
};

if (!client) {
  return <div className="p-10">Cliente não encontrado.</div>;
}

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-2">{client.name}</h2>
      <p className="text-gray-500 mb-8">{client.phone}</p>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h3 className="font-semibold mb-4">Novo Produto Recorrente</h3>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nome do produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <input
            type="number"
            placeholder="Duração (dias)"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border rounded-lg px-4 py-2 w-40"
          />

          <button
            onClick={createProduct}
            className="bg-black text-white px-6 rounded-lg"
          >
            Criar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <h4 className="font-bold text-lg">{product.name}</h4>
            <p className="text-gray-500 mt-2">
              Próximo lembrete: {product.next_reminder_date || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}