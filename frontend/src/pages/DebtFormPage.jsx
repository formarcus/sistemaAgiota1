import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import DebtForm from "../components/debtForm";

function DebtFormPage() {
    const { id, userId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [clients, setClients] = useState([]);
    const [debt, setDebt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const clientsResponse = await api.get("/users");
                setClients(clientsResponse.data);

                if (isEditing) {
                    const debtResponse = await api.get(`/debts/${id}`);
                    setDebt(debtResponse.data);
                }
            }
            catch (error) {
                console.error("Erro ao buscar dados", error);
            }
            finally {
                setLoadingData(false);
            }
        }
        loadData();
    }, [id,isEditing]);

    async function handleSubmit(data) {
        try {
            setLoading(true);

            if (isEditing) {
                await api.put(`/debts/${id}`, data);
            }
            else {
                await api.post("/debts", data);
            }

            navigate("/dividas");
        }
        catch (error) {
            console.error("Erro ao salvar dívida", error);

            alert(
                error.response?.data?.error ||
                "Não foi possível salvar a dívida."
            )
        }
        finally {
            setLoading(false);
        }

        if (loadingData) {
            return (
                <p>
                    Carregando...
                </p>
            )
        }
    }

    return (

        <div className="mx-auto max-w-2xl">

            <h1 className="text-3xl font-bold text-gray-800">

                {isEditing
                    ? "Editar dívida"
                    : "Nova dívida"
                }

            </h1>


            <p className="mt-2 text-gray-500">

                {isEditing
                    ? "Atualize os dados da dívida."
                    : "Cadastre uma nova dívida."
                }

            </p>


            <div className="mt-8 rounded-xl bg-white p-8 shadow">

                <DebtForm

                    clients={clients}

                    initialData={debt}

                    selectedClientId={
                        userId
                    }

                    onSubmit={
                        handleSubmit
                    }

                    loading={
                        loading
                    }

                />

            </div>

        </div>

    )

}


export default DebtFormPage