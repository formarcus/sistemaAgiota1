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
      catch (error) {
        console.error("Erro ao buscar dashboard", error)
      }
      finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">
          Carregando...
        </p>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">
          Não foi possível carregar
          o dashboard.
        </p>
      </div>
    )
  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Dashboard

        </h1>


        <p className="mt-2 text-gray-500">

          Visão geral da sua carteira
          de clientes e dívidas.

        </p>

      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">

            Clientes

          </p>


          <p className="mt-2 text-3xl font-bold">

            {dashboard.usersCount}

          </p>

        </div>


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">

            Total emprestado

          </p>


          <p className="mt-2 text-3xl font-bold">

            {formatMoney(
              dashboard.totalDebts
            )}

          </p>

        </div>


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">

            Total recebido

          </p>


          <p className="mt-2 text-3xl font-bold text-green-600">

            {formatMoney(
              dashboard.totalPaids
            )}

          </p>

        </div>


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">

            Total a receber

          </p>


          <p className="mt-2 text-3xl font-bold text-red-600">

            {formatMoney(
              dashboard.totalRemaining
            )}

          </p>

        </div>

      </div>


      <div className="grid gap-6 md:grid-cols-2">


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">

            Dívidas abertas

          </p>


          <p className="mt-2 text-3xl font-bold">

            {dashboard.openDebts}

          </p>

        </div>


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">

            Dívidas quitadas

          </p>


          <p className="mt-2 text-3xl font-bold text-green-600">

            {dashboard.paidDebts}

          </p>

        </div>

      </div>
      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="text-xl font-bold">

          Clientes que mais devem

        </h2>


        <div className="mt-6 space-y-4">

          {dashboard.topDebtors.map(
            debtor => (

              <div
                key={
                  debtor.userId
                }
                className="flex items-center justify-between border-b pb-4"
              >

                <p className="font-medium">

                  {debtor.name}

                </p>


                <p className="font-bold text-red-600">

                  {formatMoney(
                    debtor.remaining
                  )}

                </p>

              </div>

            )
          )}

        </div>

      </div>
      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="text-xl font-bold">

          Últimos pagamentos

        </h2>


        <div className="mt-6 space-y-4">

          {dashboard.recentPayments.map(
            payment => (

              <div
                key={
                  payment.id
                }
                className="flex items-center justify-between border-b pb-4"
              >

                <div>

                  <p className="font-medium">

                    {
                      payment.debt.user.name
                    }

                  </p>


                  <p className="text-sm text-gray-500">

                    {
                      payment.description ||
                      "Pagamento"
                    }

                  </p>

                </div>


                <p className="font-bold text-green-600">

                  {formatMoney(
                    payment.amount
                  )}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  )

}

export default Dashboard