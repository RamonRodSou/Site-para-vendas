"use client";

import { useState } from "react";
import Item from "../item/item";
import { useQuery } from "@tanstack/react-query";
import { produtoService } from "@/service/produto/ProdutoService";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Categoria } from "@/types/produto/categoria";

interface ListaProdutosProps {
    titulo: string;
    itemsPerPage?: number;
    categoria?: string; 
}

export default function ListaProdutos({ titulo, itemsPerPage = 8, categoria }: ListaProdutosProps) {
    const [page, setPage] = useState<number>(1);
    const nomeCategoria = categoria && !isNaN(Number(categoria)) 
        ? Categoria[Number(categoria)] 
        : titulo;

    const { data: produtos = [], isLoading, isPlaceholderData } = useQuery({
        queryKey: ['produtos', page, categoria],
        queryFn: () => {
            if (categoria) {
                const categoriaParaBuscar = !isNaN(Number(categoria)) 
                    ? Categoria[Number(categoria)] 
                    : categoria;
                return produtoService.getByCategory(categoriaParaBuscar, page, itemsPerPage);
            }
            return produtoService.getAllPagined(page, itemsPerPage);
        },
        staleTime: 1000 * 60 * 5, 
        placeholderData: (previousData) => previousData,
    });

    const handleNext = () => {
        if (produtos.length === itemsPerPage) {
            setPage((old) => old + 1);
        }
    };

    const handlePrev = () => {
        setPage((old) => Math.max(old - 1, 1));
    };

    return (
        <section className="max-w-6xl mx-auto bg-slate-50">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-[1.5rem] font-black text-slate-900 leading-tight uppercase">
                    {nomeCategoria}
                </h1>
            </div>

            {/* Container com altura mínima para evitar pulos na interface */}
            <div className="min-h-[680px]"> 
                {isLoading && !isPlaceholderData ? (
                    <div className="h-[680px] flex items-center justify-center text-slate-400">
                        Carregando estoque...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {produtos.map((it) => (
                            <Item key={it.id} data={it}/>
                        ))}
                    </div>
                )}
                
                {produtos.length === 0 && !isLoading && (
                     <div className="text-center py-20 text-slate-500">
                        Fim dos resultados.
                        <Button variant="link" onClick={() => setPage(1)}>Voltar ao início</Button>
                     </div>
                )}
            </div>

            <div className="flex justify-end my-6">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        disabled={page === 1 || isLoading}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-slate-600">
                        Pág {page}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={produtos.length < itemsPerPage || isLoading}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}