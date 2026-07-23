export function toCents(value:any) {
    return Math.round(Number(value)*100)
}

export function fromCents(value:any){
    return Number(value) / 100
}

