
export function formatMoney(cents){

    const value = cents / 100
    
    return new Intl.NumberFormat(
        "pt-br",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(value)
}