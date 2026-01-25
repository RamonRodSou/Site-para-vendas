import { Plataforma } from "@/types/integracao/plataforma";

export const INTEGRACAO_LIST = [
  {
    id: Plataforma.MERCADO_LIVRE,
    name: "Mercado Livre",
    description: "Sincronize estoque e publique anúncios automaticamente no maior marketplace da AL.",
    color: "bg-[#FFE600]",
    textColor: "text-black",
    icon: "ML" 
  },
  {
    id: Plataforma.OLX,
    name: "OLX",
    description: "Integração em breve. Publique seus veículos na OLX com um clique.",
    color: "bg-[#6E0AD6]",
    textColor: "text-white",
    icon: "OLX",
    disabled: true
  }
]