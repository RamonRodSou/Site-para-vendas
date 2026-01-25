import { 
    LayoutDashboard, 
    Car, 
    Users, 
    MessageSquare, 
    BarChart3, 
    Settings, 
    Zap 
  } from "lucide-react";
  
  export const telas = [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
      { label: "Produtos", icon: Car, href: "/dashboard/produtos", color: "text-violet-500" },
      { label: "Mensagens", icon: MessageSquare, href: "/dashboard/mensagens", color: "text-orange-700" },
      { label: "Integrações", icon: Zap, href: "/dashboard/integracoes", color: "text-yellow-500" }, 
      { label: "Financeiro", icon: BarChart3, href: "/dashboard/financeiro", color: "text-emerald-500" },
      { label: "Configurações", icon: Settings, href: "/dashboard/configuracoes", color: "text-gray-500" },
  ]; 