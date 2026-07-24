function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* Sidebar */}

        <aside className="w-64 min-h-screen bg-gray-900 text-white">

          <div className="p-6">

            <h1 className="text-xl font-bold">
              Controle de Dívidas
            </h1>

          </div>

          <nav className="px-4">

            <a
              href="#"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              Clientes
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              Dívidas
            </a>

            <a
              href="#"
              className="block rounded-lg px-4 py-3 hover:bg-gray-800"
            >
              Pagamentos
            </a>

          </nav>

        </aside>


        {/* Conteúdo */}

        <main className="flex-1 p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h2>

        </main>

      </div>

    </div>
  )
}

export default App