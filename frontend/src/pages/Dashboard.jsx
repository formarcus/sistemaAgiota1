import { useEffect, useState } from "react"
import api from "../services/api"
import { formatMoney } from "../utils/formatMoney";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      
      try {
        const respose = await api.get("/dashboard");
        setDashboard(respose.data)
      }
      catch(error){
        console.error("Erro ao buscar dashboard", error)
      }
      finally{
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  if(loading){
    return (
      <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">
            Carregando...
          </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">

        {/* Conteúdo */}

        <main className="flex-1 p-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h2>

          
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white p-6 shadow">

              <p className="text-sm text-gray-500">
                Clientes
              </p>

              <p className="mt-2 text-3xl font-bold">
                {dashboard?.totalUsers ?? 0}
              </p>

            </div>


            <div className="rounded-xl bg-white p-6 shadow">

              <p className="text-sm text-gray-500">
                Clientes devedores
              </p>

              <p className="mt-2 text-3xl font-bold">
                {dashboard?.usersWithDebt ?? 0}
              </p>

            </div>


            <div className="rounded-xl bg-white p-6 shadow">

              <p className="text-sm text-gray-500">
                Total recebido
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatMoney(dashboard?.totalPaid?.toFixed(2) ?? "0,00")}
              </p>

            </div>


            <div className="rounded-xl bg-white p-6 shadow">

              <p className="text-sm text-gray-500">
                Total a receber
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatMoney(dashboard?.totalOwed?.toFixed(2) ?? "0,00")}
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard