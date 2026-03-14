import { Base } from "../base";

export interface Produto extends Base {
    title: string
    original_price: number
    current_price: number
    discount: number
    image_url: string
    store_logo: string
    store_name: string
    affiliate_link: string
    cupom: string
    category: string
}