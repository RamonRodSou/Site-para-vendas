"use client";

import Link from "next/link"; 
import Item from "../item/item";
import { useQuery } from "@tanstack/react-query";
import { produtoService } from "@/service/produto/ProdutoService";


export default function Hero() {

    const { data: produtos = [], isLoading } = useQuery({
        queryKey: ['produtos'],
        queryFn: produtoService.getAll,
        staleTime: 1000 * 60 * 5,
    });

    console.log(produtos)

    return (
        <section>
            <h1 className="text-[1.5rem] font-black text-slate-900 leading-tight mb-4">
                Promoções do dia
            </h1>
            {isLoading ? (
                <h2 className="h-24 text-center">
                    Carregando estoque...
                </h2>
            ) :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {produtos.map((it) => (
                        <Link 
                            key={it.id} 
                            href={`/produto/${it.id}`} 
                            className="block h-full" 
                        >
                            <Item data={it}/>
                        </Link>
                    ))}
                </div>
            }
        </section>
    )
}