import { Base } from "../base";
import { Categoria } from "./categoria";

export interface Produto extends Base {
    title: string
    originalPrice: number
    currentPrice: number
    discount: number
    imageUrl: string
    storeLogo: string
    storeName: string
    postedAt: string
    affiliateLink: string
    category: Categoria
}