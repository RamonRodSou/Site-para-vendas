import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Car, DollarSign, Users, Activity } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produtos em Estoque</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+4 adicionados hoje</p>
            </CardContent>
            </Card>

            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas no Mês</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">R$ 452.000</div>
                <p className="text-xs text-muted-foreground">+12% comparado ao mês anterior</p>
            </CardContent>
            </Card>

            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+201 na última hora</p>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">4.5%</div>
                <p className="text-xs text-muted-foreground">Meta de 5%</p>
            </CardContent>
            </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                Gráfico de Barras virá aqui (Recharts)
                </div>
            </CardContent>
            </Card>
            <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Últimas Vendas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Fiat Toro</p>
                        <p className="text-sm text-muted-foreground">Vendido por João</p>
                    </div>
                    <div className="ml-auto font-medium">+R$ 120.000</div>
                    </div>
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
    )
}