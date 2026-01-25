export class MoneyUtils {
    static formatToReal (value: number) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
    }
}        