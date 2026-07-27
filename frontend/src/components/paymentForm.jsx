import { useState } from "react";

function PaymentForm({ debtId, onSubmit, loading = false }) {

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        debugger;
        e.preventDefault();
        const amountInCents = Math.round(Number(amount) * 100);

        await onSubmit({ debtId, amount: amountInCents, description });

        setAmount("");
        setDescription("");

    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="space-y-4"
        >

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Valor do pagamento

                </label>


                <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={event =>
                        setAmount(
                            event.target.value
                        )
                    }
                    placeholder="200.00"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

            </div>


            <div>

                <label className="mb-2 block text-sm font-medium">

                    Descrição

                </label>


                <input
                    type="text"
                    value={description}
                    onChange={event =>
                        setDescription(
                            event.target.value
                        )
                    }
                    placeholder="Ex: Pix"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

            </div>


            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >

                {loading
                    ? "Registrando..."
                    : "Registrar pagamento"
                }

            </button>

        </form>

    )

}

export default PaymentForm