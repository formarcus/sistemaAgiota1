import { isValidElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

function Clients() {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    async function handleDeactivate(id) {

        const confirmed = window.confirm("Deseja realmente desativar este cliente?")

        if (!confirmed) {
            return
        }

        try {
            await api.delete(`/users/${id}`)

            setClients(prev => 
                prev.map(client => client.id === id ? { ...client, active: false } : client))
        }
        catch (error) {
            console.error("Error ao desativar cliente".error)
            alert("Não foi possível desativar cliente")
        }
    }

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
                        Clientes
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Gerencie seus clientes
                    </p>
                </div>
                <Link to={"/clientes/novo"} 
                      className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
                    + Novo cliente
                </Link>
                   
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

                                    <span className={client.active
                                        ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                                        : "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                                    }>


                                        {client.active
                                            ? "Ativo"
                                            : "Inativo"
                                        }
                                    </span>

                                </td>

                                <td className="px-6 py-4 text-right">

                                    <Link
                                        to={`/clientes/${client.id}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        [Ver]
                                    </Link>

             
                                    <Link
                                        to={`/clientes/${client.id}/editar`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        [Editar]
                                    </Link>

                                    <button
                                        onClick={() => { handleDeactivate(client.id) }}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        [Desativar]
                                    </button>
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