"use client";

import { produtoService } from "@/service/produto/ProdutoService";
import { Produto } from "@/types/produto/produto"; 
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
    Clock,
    Copy,
    Check
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import CarouselData from "@/src/components/carouselData/carouselData";
import { useQuery } from "@tanstack/react-query";
import { DateUtils } from "@/lib/dataUtils";
import { MoneyUtils } from "@/lib/moneyUtils";

export default function ProdutoPage() {

    const params = useParams();
    const dataId = params.id as string;

    const [product, setProduct] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const { data: produtos = [] } = useQuery({
        queryKey: ['produtos'],
        queryFn: produtoService.getAll,
        staleTime: 1000 * 60 * 5,
    });
    
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

    const handleCopyCoupon = () => {
        if (product?.cupom) {
            navigator.clipboard.writeText(product.cupom);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000); 
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">Carregando oferta...</div>;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
                <p className="text-red-500 font-medium text-sm">{error || "Produto não localizado."}</p>
                <Link href="/" className="text-blue-600 hover:underline text-sm">Voltar para o início</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-6 px-3 md:px-8">
            <div className="max-w-5xl mx-auto">
                
                <Link 
                    href="/" 
                    className="inline-flex items-center text-xs md:text-sm font-medium text-slate-500 hover:text-orange-600 mb-4 md:mb-6 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Voltar para ofertas
                </Link>

                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        <div className="p-6 md:p-8 bg-white flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-100 min-h-[300px] lg:min-h-[400px]">
                            
                            {product.discount > 0 && (
                                <Badge className="absolute top-4 left-4 md:top-6 md:left-6 bg-green-600 text-white hover:bg-green-700 text-xs md:text-lg py-0.5 px-2 md:py-1 md:px-3 z-10">
                                    -{product.discount}% OFF
                                </Badge>
                            )}

                            <div className="relative w-full h-[260px] sm:h-[350px] lg:h-[400px]">
                                <Image 
                                    src={product.image_url} 
                                    alt={product.title}
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-500"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        <div className="p-5 md:p-8 flex flex-col justify-center bg-white/50">
                            
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 md:px-3 md:py-1 rounded-full border border-slate-200">
                                    <Avatar className="h-5 w-5 md:h-6 md:w-6">
                                        <AvatarImage src={product.store_logo} />
                                        <AvatarFallback><Store size={12}/></AvatarFallback>
                                    </Avatar>
                                    <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wide">
                                        {product.store_name}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-[10px] md:text-xs text-slate-400">
                                    <Clock size={12} className="md:w-3.5 md:h-3.5" />
                                    <span>Postado {DateUtils.dateFormated(product.data_criacao)}</span>
                                </div>
                            </div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-4 md:mb-6">
                                {product.title}
                            </h1>

                            <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100 mb-6 md:mb-8">
                                <div className="flex flex-col gap-0.5 md:gap-1">
                                    {product.original_price > product.current_price && (
                                        <span className="text-xs md:text-sm text-slate-400 line-through">
                                            De: {MoneyUtils.formatToReal(product.original_price)}
                                        </span>
                                    )}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl md:text-4xl font-black text-slate-900">
                                            {MoneyUtils.formatToReal(product.current_price)}
                                        </span>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-green-600 font-semibold mt-1">
                                        Melhor preço encontrado hoje
                                    </p>
                                </div>

                                {/* --- INÍCIO DA ÁREA DO CUPOM --- */}
                                {product.cupom && (
                                    <div className="mt-5 w-full">
                                        <button 
                                            onClick={handleCopyCoupon}
                                            className="w-full flex items-center justify-between bg-slate-100 border-2 border-dashed border-slate-300 rounded-full px-5 py-3 hover:bg-slate-200 transition-colors focus:outline-none"
                                        >
                                            <span className="text-base md:text-lg font-bold text-slate-700">
                                                {product.cupom}
                                            </span>
                                            <span className={`text-xs md:text-sm font-bold flex items-center gap-1 ${isCopied ? 'text-green-600' : 'text-slate-500'}`}>
                                                {isCopied ? "COPIADO!" : "COPIAR"}
                                            </span>
                                        </button>
                                        <p className="text-[10px] md:text-[11px] text-center text-slate-500 mt-2">
                                            O campo para digitar o cupom fica no carrinho de compras ou na tela que escolhe a forma de pagamento.
                                        </p>
                                    </div>
                                )}

                                <Button 
                                    size="lg" 
                                    className="w-full mt-4 md:mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base md:text-lg h-12 md:h-14 shadow-lg shadow-orange-100"
                                    asChild
                                >
                                    <a 
                                        href={product.affiliate_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Ver Oferta na Loja
                                        <ExternalLink className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                    </a>
                                </Button>
                                <p className="text-[9px] md:text-[10px] text-center text-slate-400 mt-2 md:mt-3">
                                    Ao clicar você será redirecionado para o site da {product.store_name}.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border border-[#ffb800] hover:bg-white transition-colors">
                                    <ShieldCheck className="text-green-600 h-4 w-4 md:h-5 md:w-5" />
                                    <div>
                                        <p className="text-[11px] md:text-xs font-bold text-slate-700">Compra Segura</p>
                                        <p className="text-[9px] md:text-[10px] text-slate-500">Garantida pela loja</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg border border-[#ffb800] hover:bg-white transition-colors">
                                    <Truck className="text-green-600 h-4 w-4 md:h-5 md:w-5" />
                                    <div>
                                        <p className="text-[11px] md:text-xs font-bold text-slate-700">Entrega Rápida</p>
                                        <p className="text-[9px] md:text-[10px] text-slate-500">Envio imediato</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <CarouselData data={produtos}/>
        </main>
    );
}