import { Base } from "../base";
import { Categoria } from "./categoria";

export interface Produto extends Base {
    title: string
    original_price: number
    current_price: number
    discount: number
    image_url: string
    store_logo: string
    store_name: string
    created_at: string
    affiliate_link: string
    category: string
}