export default function Price(value: number, currency: string): string {
    let val = value.toFixed(2)
    val = val.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
    return `${val} ${currency ? currency : 'RUB'}`
}