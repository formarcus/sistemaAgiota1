import { useEffect, useState } from "react";


function ClientForm({ initialData = null, onSubmit, loading = false }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: ""
    })

    useEffect(() => {
        
        if (initialData) {
            
            setForm({
                name: initialData.name || "",
                phone: initialData.phone || "",
                email: initialData.email || "",
            })
        }
    }, [initialData])

    function handleChange(event) {

        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        await onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nome
                </label>
                <input type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Digite o nome" required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500" />
            </div>

            <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">

                    Telefone

                </label>

                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(65) 99999-9999"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

            </div>

            <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">

                    Email

                </label>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="cliente@email.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

                {loading
                    ? "Salvando..."
                    : "Salvar cliente"
                }

            </button>

        </form>

    )

}

export default ClientForm