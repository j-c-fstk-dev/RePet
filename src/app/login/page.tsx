'use client'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'http://localhost:3000/dashboard'
  }
})
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Entrar com Google
      </button>
    </div>
  )
}
