import { 
    LayoutDashboard, 
    Car,
    Package,
    Ticket,
    Users, 
    MessageSquare, 
    BarChart3, 
    Settings, 
    Zap 
  } from "lucide-react";
  
  export const telas = [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
      { label: "Produtos", icon: Package, href: "/dashboard/produtos", color: "text-violet-500" },
      { label: "Cupom", icon: Ticket, href: "/dashboard/cupom", color: "text-orange-500" },
//       { label: "Mensagens", icon: MessageSquare, href: "/dashboard/mensagens", color: "text-orange-700" },
//       { label: "Financeiro", icon: BarChart3, href: "/dashboard/financeiro", color: "text-emerald-500" },
//       { label: "Configurações", icon: Settings, href: "/dashboard/configuracoes", color: "text-gray-500" },
  ]; 