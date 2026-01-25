import { Categoria } from "@/types/produto/categoria";
import * as z from "zod";

export const produtoSchema = z.object({
    title: z.string().min(3, { message: "Obrigatório (mín. 3 caracteres)" }),
    
    original_price: z.number().min(1, { message: "Preço inválido" }),
    current_price: z.number().min(1, { message: "Preço atual é obrigatório" }),
    discount: z.number().min(0).max(100, { message: "Desconto deve ser entre 0 e 100" }),
    
    image_url: z.string(),

    store_name: z.string().min(1, { message: "Obrigatório" }),
    store_logo: z.string().url({ message: "URL do logo inválida" }),
    
    affiliate_link: z.string().url({ message: "Link de afiliado inválido" }),
    
    category: z.nativeEnum(Categoria, {
        message: "Selecione uma categoria válida",
    }),
});

export type ProdutoFormData = z.infer<typeof produtoSchema>; 