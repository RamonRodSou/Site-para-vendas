import { Affiliate } from "./affiliate";

const amazon = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
const mercadoLivre = "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__small.png"
const shopee = "https://logospng.org/download/shopee/logo-shopee-1024.png"
const outros = "https://static.vecteezy.com/system/resources/previews/024/044/658/non_2x/shopping-bag-arrow-logo-vector.jpg"

export const imageLogoAffiliate = [
    { id: 1, name: Affiliate.AMAZON, imageUrl: amazon, label: "Amazon" },
    { id: 2, name: Affiliate.MERCADO_LIVRE, imageUrl: mercadoLivre, label: "Mercado Livre" },
    { id: 3, name: Affiliate.SHOPEE, imageUrl: shopee, label: "Shopee" },
    { id: 4, name: Affiliate.OUTROS, imageUrl: outros, label: "Outros" },
];


