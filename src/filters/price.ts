export default function Price(value: number, currency: string): string {
    return `${value.toFixed(2)} ${currency ? currency : 'RUB'}`
}