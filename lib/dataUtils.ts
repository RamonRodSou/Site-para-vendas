export class DateUtils {
    static dateFormated(date: Date | string) {
        return new Date(date).toLocaleDateString("pt-BR")
    }
}