"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Bem-vindo, {profile.name}
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Clientes</p>
          <p className="text-2xl font-bold mt-2">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Produtos Ativos</p>
          <p className="text-2xl font-bold mt-2">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Lembretes Próximos</p>
          <p className="text-2xl font-bold mt-2">--</p>
        </div>
      </div>
    </div>
  );
}
