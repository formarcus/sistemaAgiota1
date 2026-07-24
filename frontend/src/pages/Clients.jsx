import { isValidElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Clients() {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadClients() {
            try {
                const response = await api.get("/users")
                setClients(response.data)
            }
            catch (error) {
                console.error(
                    "Error ao buscar clientes",
                    error
                )
            }
            finally {
                setLoading(false)
            }
        }

        loadClients()
    }, [])

    if (loading) {
        return (
            <p>
                Carregando clientes...
            </p>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3x1 font-bold text-gray-800">
                        Clientes
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Gerencie seus clientes
                    </p>
                </div>
                <button className="rounded-lg bg-blue-600 px-5 -py-3 font-medium text-white hover:bg-blue-700">
                    + Novo cliente
                </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Nome
                            </th>

                            <th className="px-6 py-4 text-left">
                                Telefone
                            </th>

                            <th className="px-6 py-4 text-left">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-right">
                                Ações
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {clients.map(client => (

                            <tr
                                key={client.id}
                                className="border-t"
                            >

                                <td className="px-6 py-4 font-medium">
                                    {client.name}
                                </td>

                                <td className="px-6 py-4">
                                    {client.phone || "-"}
                                </td>

                                <td className="px-6 py-4">
                                    {client.email || "-"}
                                </td>

                                <td className="px-6 py-4">

                                    {client.active
                                        ? "Ativo"
                                        : "Inativo"
                                    }

                                </td>

                                <td className="px-6 py-4 text-right">

                                    <Link
                                        to={`/clientes/${client.id}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Ver detalhes
                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Clients