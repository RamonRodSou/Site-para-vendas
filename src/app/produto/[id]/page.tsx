"use client";

import { produtoService } from "@/service/produto/ProdutoService";
import { Produto } from "@/src/types/produto/produto"; 
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    ArrowLeft, 
    ShieldCheck, 
    Truck, 
    ExternalLink, 
    Store, 
    Clock 
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";

export default function ProdutoPage() {

    const params = useParams();
    const dataId = params.id as string;

    console.log('idddd', dataId)

    const [product, setProduct] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!dataId) return;

        async function load() {
            try {
                setLoading(true);
                const response = await produtoService.getById(String(dataId));
                
                if (response) {
                    setProduct(response); 
                } else {
                    setError("Produto não encontrado.");
                }
            } catch (err) {
                setError("Ocorreu um erro ao carregar os detalhes do produto.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [dataId]);

    const formatMoney = (value: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Carregando oferta...</div>;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 font-medium">{error || "Produto não localizado."}</p>
                <Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                
                <Link 
                    href="/" 
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-orange-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para ofertas
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        <div className="p-8 bg-white flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-100 min-h-[400px]">
                            
                            {product.discount > 0 && (
                                <Badge className="absolute top-6 left-6 bg-green-600 text-white hover:bg-green-700 text-lg py-1 px-3 z-10">
                                    -{product.discount}% OFF
                                </Badge>
                            )}

                            <div className="relative w-full h-[400px]">
                                <Image 
                                    src={product.imageUrl} 
                                    alt={product.title}
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-500"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        <div className="p-8 flex flex-col justify-center bg-white/50">
                            
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={product.storeLogo} />
                                        <AvatarFallback><Store size={14}/></AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                        {product.storeName}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <Clock size={14} />
                                    <span>Postado {product.postedAt}</span>
                                </div>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-6">
                                {product.title}
                            </h1>

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                                <div className="flex flex-col gap-1">
                                    {product.originalPrice > product.currentPrice && (
                                        <span className="text-sm text-slate-400 line-through">
                                            De: {formatMoney(product.originalPrice)}
                                        </span>
                                    )}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900">
                                            {formatMoney(product.currentPrice)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-green-600 font-semibold mt-1">
                                        Melhor preço encontrado hoje
                                    </p>
                                </div>

                                <Button 
                                    size="lg" 
                                    className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg h-14 shadow-lg shadow-orange-100"
                                    asChild
                                >
                                    <a 
                                        href={product.affiliateLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Ver Oferta na Loja
                                        <ExternalLink className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                                <p className="text-[10px] text-center text-slate-400 mt-3">
                                    Ao clicar você será redirecionado para o site da {product.storeName}.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-white transition-colors">
                                    <ShieldCheck className="text-green-600 h-5 w-5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Compra Segura</p>
                                        <p className="text-[10px] text-slate-500">Garantida pela loja</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-white transition-colors">
                                    <Truck className="text-blue-600 h-5 w-5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Entrega Rápida</p>
                                        <p className="text-[10px] text-slate-500">Envio imediato</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}