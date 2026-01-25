"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2 } from "lucide-react";
import { ConfigModal } from "@/components/modules/integracao/config-modal";
import { Plataforma } from "@/types/integracao/plataforma";
import { INTEGRACAO_LIST } from "./integracao-list";
import { api } from "@/service/api";
import { stringUtil } from "@/lib/stringUtils";

interface IntegracaoStatus {
    plataforma: Plataforma;
    conectado: boolean;
}

export default function IntegracoesPage() {
    const [selectedApp, setSelectedApp] = useState<Plataforma | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: statusList = [], isLoading } = useQuery<IntegracaoStatus[]>({
        queryKey: ['integracoes-status'],
        queryFn: async () => {
            const response = await api.get("/integracoes/status");
            return response.data;
        }
    });

    const isOnline = (plataforma: Plataforma) => {
        return statusList.find(s => s.plataforma === plataforma)?.conectado ?? false;
    }

    function handleOpenConfig(plataforma: Plataforma) {
        setSelectedApp(plataforma);
        setIsModalOpen(true);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
                <p className="text-muted-foreground">
                Conecte seu CRM às principais plataformas de venda de veículos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INTEGRACAO_LIST.map((app) => {
                    const online = isOnline(app.id); 

                    return (
                        <Card key={app.id} className={`flex flex-col border-t-4 transition-all ${online ? 'border-green-500 shadow-md' : stringUtil.EMPTY}`} 
                              style={{ borderTopColor: online ? undefined : (app.id === Plataforma.MERCADO_LIVRE ? '#FFE600' : '#6E0AD6') }}>
                            
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl ${app.color} ${app.textColor}`}>
                                        {app.icon}
                                    </div>
                                    
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    ) : online ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 gap-1 px-3">
                                            <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                                            ONLINE
                                        </Badge>
                                    ) : app.disabled ? (
                                        <Badge variant="outline">Em Breve</Badge>
                                    ) : (
                                        <Badge variant="secondary" className="text-muted-foreground">Offline</Badge>
                                    )}
                                </div>
                                <CardTitle className="mt-4">{app.name}</CardTitle>
                                <CardDescription>{app.description}</CardDescription>
                            </CardHeader>
                            
                            <CardContent className="flex-1">
                                {online && (
                                    <div className="text-sm text-green-600 flex items-center gap-2 bg-green-50 p-2 rounded-md border border-green-100">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Sincronização ativa
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter>
                                <Button 
                                    variant={online ? "outline" : (app.id === Plataforma.MERCADO_LIVRE ? "default" : "outline")}
                                    className={`w-full ${online ? 'border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800' : stringUtil.EMPTY}`}
                                    disabled={app.disabled}
                                    onClick={() => handleOpenConfig(app.id)}
                                >
                                    {online ? "Gerenciar Conexão" : "Configurar"}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            {selectedApp && (
                <ConfigModal 
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                    plataforma={selectedApp}
                    nomeAmigavel={INTEGRACAO_LIST.find(i => i.id === selectedApp)?.name || stringUtil.EMPTY}
                />
            )}
        </div>
    )
}