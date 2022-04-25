export default {
    Hours(value: number | Date): string {
        const date = typeof value === 'number' ? new Date(value) : value 
        const hourse: string = date.getHours() < 10 ? '0' + date.getHours() : date.getHours().toString()
        const minutes: string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString()
        return `${hourse}:${minutes}`
    },
    Duration(value: number | Date): string {
        const date = typeof value === 'number' ? value : value.getTime() 
        const hours: number = date / 1000 / 60 / 60
        const minutes: number = new Date(date).getMinutes()

        return `${hours}ч. ${minutes}мин.`
    }
}