import { Base } from "../base";

export interface Cupom extends Base {
    title: string
    description: string
    discount: number
    image_url: string
    affiliate: string
    cupom: string
}