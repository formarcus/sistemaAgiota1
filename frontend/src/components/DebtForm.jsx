import { useState, useEffect } from "react";

function DebtForm({ clients = [], selectedClientId = null, onSubmit, initialData = {}, loading = false }) {
   
  const [form, setForm] = useState({
        userId: "",
        description: "",
        amount: "",
    })

    useEffect(() => {
      
        if (initialData) {

            setForm({
                userId: String(initialData.userId || ""),
                description: initialData.description || "",
                amount: initialData.amount / 100 || "",
            })
        }

        if (selectedClientId) {
            setForm((prevForm) => ({
                ...prevForm,
                userId: String(selectedClientId),
            }))
        }
    }, [initialData, selectedClientId])

    function handleChange(event) {
        const { name, value } = event.target;
        
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const amountInCents = Math.round(Number(form.amount) * 100);
        await onSubmit({
            userId: Number(form.userId),
            description: form.description,
            amount: amountInCents,
        })
    }
    
    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Cliente

        </label>


        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >

          <option value="">
            Selecione um cliente
          </option>


          {clients.map(client => (

            <option
              key={client.id}
              value={client.id}
            >
              {client.name}
            </option>

          ))}

        </select>

      </div>


      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Descrição

        </label>


        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Ex: Empréstimo"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

      </div>


      <div>

        <label className="mb-2 block text-sm font-medium text-gray-700">

          Valor

        </label>


        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="1000.00"
          min="0.01"
          step="0.01"
          required
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
          : "Salvar dívida"
        }

      </button>

    </form>

  )

}


export default DebtForm