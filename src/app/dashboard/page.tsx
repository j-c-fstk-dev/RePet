'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  if (!user) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Bem-vindo, {user.email}
      </h1>
    </div>
  )
}
