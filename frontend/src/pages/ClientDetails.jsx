import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { formatMoney } from "../utils/formatMoney";

function ClientesDetails() {
    const { id } = useParams()

    const [summary, setSummary] = useState(null)
    const [debts, setDebts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadClient() {
            try {
                const [
                    summaryResponse,
                    debtsResponse
                ] = await Promise.all([
                    api.get(`/users/${id}/debts`),
                    api.get(`/users/${id}/summary`)
                ])

                setSummary(summaryResponse.data)
                setDebts(debtsResponse.data)
            }
            catch (error) {
                console.error("Erro ao buscar cliente",
                    error
                )
            }
            finally {
                setLoading(false)
            }
        }

        loadClient()
    }, [id])

    if (loading) {
        return (
            <p>
                Carregando cliente...
            </p>
        )
    }
    return (

        <div>

            <Link
                to="/clientes"
                className="text-blue-600 hover:underline"
            >
                ← Voltar para clientes
            </Link>


            <div className="mt-6">

                <h1 className="text-3xl font-bold">
                    {summary?.user?.name}
                </h1>

                <p className="mt-1 text-gray-500">
                    {summary?.user?.phone}
                </p>

            </div>


            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">


                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">
                        Total em dívidas
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {formatMoney(
                            summary?.totalDebts ?? 0
                        )}
                    </p>

                </div>


                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">
                        Total pago
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {formatMoney(
                            summary?.totalPaid ?? 0
                        )}
                    </p>

                </div>


                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">
                        Total a receber
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {formatMoney(
                            summary?.totalOwed ?? 0
                        )}
                    </p>

                </div>


            </div>


            <div className="mt-8 rounded-xl bg-white shadow">

                <div className="border-b p-6">

                    <h2 className="text-xl font-bold">
                        Dívidas
                    </h2>

                </div>


                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

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
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {debts.map(debt => (

                            <tr
                                key={debt.id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">
                                    {debt.description}
                                </td>

                                <td className="px-6 py-4">
                                    {formatMoney(debt.amount)}
                                </td>

                                <td className="px-6 py-4">
                                    {formatMoney(debt.totalPaid)}
                                </td>

                                <td className="px-6 py-4">
                                    {formatMoney(debt.totalOwed)}
                                </td>

                                <td className="px-6 py-4">
                                    {debt.status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default ClientesDetails