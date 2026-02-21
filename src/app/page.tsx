export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Repet</h1>
        <p className="mt-4">Sistema de fidelidade inteligente para petshops</p>
        <a
          href="/login"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg"
        >
          Entrar
        </a>
      </div>
    </main>
  )
}