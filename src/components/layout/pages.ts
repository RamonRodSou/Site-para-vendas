import { 
    TicketPercent, 
    Flame,       
    LayoutGrid,    
    Smartphone,    
    Headset,
    Home        
} from "lucide-react";

export const pages = [
    { 
        label: "Inicio", 
        icon: Home, 
        href: "/",
        color: "text-green-600" 
    },
    { 
        label: "CUPOM", 
        icon: TicketPercent, 
        href: "/cupons",
        color: "text-green-600" 
    },
    { 
        label: "PROMOÇÃO DO DIA", 
        icon: Flame, 
        href: "/promocoes", 
        color: "text-orange-600" 
    },
    { 
        label: "CATEGORIAS", 
        icon: LayoutGrid, 
        href: "/categorias", 
        color: "text-slate-600" 
    },
    { 
        label: "GRUPOS VIP",
        icon: Smartphone, 
        href: "/grupos", 
        color: "text-blue-600"
    },
    { 
        label: "CONTATO", 
        icon: Headset, 
        href: "/contato", 
        color: "text-slate-600" 
    }, 
];