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
        label: "INÍCIO", 
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
        label: "PROMOÇÕES", 
        icon: Flame, 
        href: "/promocoes", 
        color: "text-orange-600" 
    },
    { 
        label: "CATEGORIAS", 
        icon: LayoutGrid, 
        href: "/categorias", 
        color: "text-write" 
    },
    { 
        label: "GRUPOS VIP",
        icon: Smartphone, 
        href: "https://chat.whatsapp.com/IKWDaRXVSEQ3g6mqNztVlS?mode=hq1tcla", 
        color: "text-blue-600"
    },
    // { 
    //     label: "CONTATO", 
    //     icon: Headset, 
    //     href: "/contato", 
    //     color: "text-write" 
    // }, 
];