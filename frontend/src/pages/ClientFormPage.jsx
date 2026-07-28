import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ClientForm from "../components/ClientForm";

function ClientFormPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [client, setClient] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingClient, setLoadingClient] = useState(isEditing)

    useEffect(() => {
        
        if (!isEditing) {
            return
        }

        async function loadClient() {
            try {
                const response = await api.get(`/users/${id}`)

                setClient(response.data)
            }
            catch (error) {
                console.error(
                    "Erro ao buscar cliente",
                    error
                )
            }
            finally {
                setLoadingClient(false)
            }
        }

        loadClient()
    }, [id, isEditing])

    async function handleSubmit(data) {
        
        try {
            setLoading(true)

            if (isEditing) {
                await api.put(`/users/${id}`, data)
            }
            else {
                await api.post("/users", data)
            }

            navigate("/clientes")
        }
        catch (error) {
            console.error("Erro ao salvar cliente", error)
            alert("Não foi possível salvar o cliente.")
        }
        finally {
            setLoading(false)
        }
    }

  if(loading){
    return (
      <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">
            Carregando clientes...
          </p>
      </div>
    )
  }

    return (

        <div className="mx-auto max-w-2xl">

            <h1 className="text-3xl font-bold text-gray-800">

                {isEditing
                    ? "Editar cliente"
                    : "Novo cliente"
                }

            </h1>

            <p className="mt-2 text-gray-500">

                {isEditing
                    ? "Atualize os dados do cliente."
                    : "Cadastre um novo cliente."
                }

            </p>

            <div className="mt-8 rounded-xl bg-white p-8 shadow">

                <ClientForm
                    initialData={client}
                    onSubmit={handleSubmit}
                    loading={loading}
                />

            </div>

        </div>

    )

}

export default ClientFormPage