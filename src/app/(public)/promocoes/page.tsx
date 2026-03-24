"use client";

import { useQuery } from "@tanstack/react-query";
import { produtoService } from "@/service/produto/ProdutoService";
import Item from "@/src/components/item/item";
import { Button } from "@/src/components/ui/button";
import { BadgePercent, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Promocao() {
    const { data: produtos = [], isLoading } = useQuery({
        queryKey: ['produtos-recentes'],
        queryFn: produtoService.getAll, 
    });

    const produtosRecentes = produtos.filter((item) => {
        if (!item.created_at) return false;
        
        const dataCriacao = new Date(item.created_at.replace(/\s/, "T"));
        const hoje = new Date();
        const dezDiasAtras = new Date();
        dezDiasAtras.setDate(hoje.getDate() - 10);

        return dataCriacao >= dezDiasAtras;
    });

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                <div className="flex flex-col gap-4 mb-8">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Voltar para início
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-600 rounded-2xl shadow-orange-200 shadow-lg">
                            <BadgePercent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                                Promoções da Semana
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Confira os itens cadastrados nos últimos 10 dias.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="min-h-[680px]">
                    {isLoading ? (
                        <div className="h-[600px] flex items-center justify-center text-slate-400 font-medium">
                            Buscando ofertas recentes...
                        </div>
                    ) : produtosRecentes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {produtosRecentes.map((it) => (
                                <Item key={it.id} data={it} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8">
                            <div className="bg-slate-100 p-4 rounded-full mb-4">
                                <BadgePercent className="w-12 h-12 text-slate-400" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Nenhuma novidade por aqui</h2>
                            <p className="text-slate-500 max-w-xs mx-auto mt-2">
                                Não encontramos produtos novos nos últimos 10 dias. Volte em breve!
                            </p>
                            <Button asChild variant="outline" className="mt-6">
                                <Link href="/">Ver todos os produtos</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}