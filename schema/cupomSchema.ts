import { Affiliate } from "@/types/logoAffiliate/affiliate";
import { Categoria } from "@/types/produto/categoria";
import * as z from "zod";

export const cupomSchema = z.object({
    title: z.string().min(3, { message: "Obrigatório (mín. 3 caracteres)" }),
    description: z.string().min(3, { message: "Obrigatório (mín. 3 caracteres)" }),

    discount: z.number().min(0).max(100, { message: "Desconto deve ser entre 0 e 100" }),
    
    image_url: z.string(),
        
    cupom: z.string(),

    affiliate: z.nativeEnum(Affiliate, {
        message: "Selecione um afiliado válida",
    }),
});

export type CupomFormData = z.infer<typeof cupomSchema>; 