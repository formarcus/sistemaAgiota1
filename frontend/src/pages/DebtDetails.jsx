import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PaymentForm from "../components/paymentForm";
import { formatMoney } from "../utils/formatMoney";

function DebtDetails() {
    const { id } = useParams();
    const [debt, setDebt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);

    async function loadDebt() {
        try {
            const response = await api.get(`/debts/${id}`);
            setDebt(response.data);
        }
        catch (error) {
            console.error("Erro ao buscar dívida", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDebt();
    }, [id]);

    async function handlePayment(data) {
        try {
            debugger;
            setPaymentLoading(true);
            await api.post(`/payments`, data);
            await loadDebt();
            alert("Pagamento registrado com sucesso!");

        }
        catch (error) {
            console.error("Erro ao registrar pagamento", error);
            alert(
                error.response?.data?.error ||
                "Não foi possível registrar o pagamento."
            );
        }
        finally {
            setPaymentLoading(false);
        }
    }

    if (loading) {
        return (
            <p>
                Carregando...
            </p>
        );
    }

    if (!debt) {
        return (
            <p>
                Dívida não encontrada.
            </p>
        );
    }

    const totalPaid = debt.payments.reduce(
        (total, payment) => total + payment.amount,
        0
    );
    const remaining = Math.max(debt.amount - totalPaid, 0);
    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold text-gray-800">

                    {debt.description}

                </h1>


                <p className="mt-2 text-gray-500">

                    Cliente:
                    {" "}
                    {debt.user?.name}

                </p>

            </div>


            <div className="grid gap-6 md:grid-cols-3">


                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">

                        Valor original

                    </p>


                    <p className="mt-2 text-2xl font-bold">

                        {formatMoney(
                            debt.amount
                        )}

                    </p>

                </div>


                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">

                        Total pago

                    </p>


                    <p className="mt-2 text-2xl font-bold text-green-600">

                        {formatMoney(
                            totalPaid
                        )}

                    </p>

                </div>


                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">

                        Saldo

                    </p>


                    <p className="mt-2 text-2xl font-bold text-red-600">

                        {formatMoney(
                            remaining
                        )}

                    </p>

                </div>

            </div>


            {debt.status === "OPEN" && (

                <div className="rounded-xl bg-white p-6 shadow">

                    <h2 className="mb-6 text-xl font-bold">

                        Registrar pagamento

                    </h2>


                    <PaymentForm

                        debtId={
                            debt.id
                        }

                        onSubmit={
                            handlePayment
                        }

                        loading={
                            paymentLoading
                        }

                    />

                </div>

            )}


            <div className="rounded-xl bg-white p-6 shadow">

                <h2 className="mb-6 text-xl font-bold">

                    Histórico de pagamentos

                </h2>


                <div className="space-y-4">

                    {debt.payments.map(
                        payment => (

                            <div
                                key={
                                    payment.id
                                }
                                className="flex items-center justify-between border-b pb-4"
                            >

                                <div>

                                    <p className="font-medium">

                                        {payment.description ||
                                            "Pagamento"
                                        }

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {new Date(
                                            payment.createdAt
                                        ).toLocaleDateString(
                                            "pt-BR"
                                        )}

                                    </p>

                                </div>


                                <p className="font-semibold text-green-600">

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


export default DebtDetails