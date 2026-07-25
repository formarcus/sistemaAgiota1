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


    if (loading) {

        return (
            <p>
                Carregando dívidas...
            </p>
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


                <button className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">

                    + Nova dívida

                </button>

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


                            const totalOwed =
                                debt.amount -
                                totalPaid


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