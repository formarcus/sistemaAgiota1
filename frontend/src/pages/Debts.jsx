import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { formatMoney } from "../utils/formatMoney";

function Debts() {
    const [debts, setDebts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadDebts() {
            try {
                const response = await api.get("/debts")
                setDebts(response.data)
            }
            catch (error) {
                console.error("erro ao buscar dívida", error)
            }
            finally {
                setLoading(false)
            }
        }

        loadDebts()
    }, [])

    async function handleDelete(id) {
        const confirmed = window.confirm("Deseja realmente excluir esta dívida?")

        if (!confirmed) {
            return
        }

        try {
            await api.delete(`/debts/${id}`)
            setDebts(prev => prev.filter(debt => debt.id !== id))
        }
        catch (error) {
            console.error("Erro ao excluir dívida", error)
            alert("Não foi possível excluir a dívida")
        }
    }

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

        <div>

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Dívidas
                    </h1>
                    <p className="mt-1 text-gray-500">
                        Controle todas as dívidas cadastradas
                    </p>

                </div>


                <Link
                    to="/dividas/nova"
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                    + Nova dívida
                </Link>

            </div>


            <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Cliente
                            </th>

                            <th className="px-6 py-4 text-left">
                                Descrição
                            </th>

                            <th className="px-6 py-4 text-left">
                                Valor
                            </th>

                            <th className="px-6 py-4 text-left">
                                Pago
                            </th>

                            <th className="px-6 py-4 text-left">
                                Saldo
                            </th>

                            <th className="px-6 py-4 text-left">
                                Ações
                            </th>
                        </tr>

                    </thead>


                    <tbody>

                        {debts.map(debt => {

                            const totalPaid =
                                debt.payments.reduce(
                                    (total, payment) =>
                                        total + payment.amount,
                                    0
                                )


                            const totalOwed = Math.max(0, debt.amount - totalPaid)


                            return (

                                <tr
                                    key={debt.id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">

                                        {debt.user?.name}

                                    </td>


                                    <td className="px-6 py-4">

                                        {debt.description}

                                    </td>


                                    <td className="px-6 py-4">

                                        {formatMoney(
                                            debt.amount
                                        )}

                                    </td>


                                    <td className="px-6 py-4">

                                        {formatMoney(
                                            totalPaid
                                        )}

                                    </td>


                                    <td className="px-6 py-4 font-semibold">

                                        {formatMoney(
                                            totalOwed
                                        )}

                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex gap-4">
                                            <Link
                                                to={`/dividas/${debt.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Ver
                                            </Link>
                                            
                                            <Link
                                                to={`/dividas/${debt.id}/editar`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(debt.id)
                                                }
                                                className="text-red-600 hover:underline"
                                            >
                                                Excluir
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    )

}


export default Debts        