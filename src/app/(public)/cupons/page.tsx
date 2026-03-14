"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cupomService } from "@/service/cupom/CupomService";
import { ChevronLeft, ChevronRight, Copy, Check, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

interface ListaCuponsProps {
    titulo?: string;
    itemsPerPage?: number;
    affiliate?: string; 
}

export default function ListaCupons({ titulo = "Cupons de Desconto", itemsPerPage = 10, affiliate }: ListaCuponsProps) {
    const [page, setPage] = useState<number>(1);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCupom, setSelectedCupom] = useState<any | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const { data: cupons = [], isLoading, isPlaceholderData } = useQuery({
        queryKey: ['cupons', page, affiliate],
        queryFn: () => {
            if (affiliate) {
                return cupomService.getAllPagined(page, itemsPerPage);
            }
            return cupomService.getAllPagined(page, itemsPerPage);
        },
        staleTime: 1000 * 60 * 5, 
        placeholderData: (previousData) => previousData,
    });

    const handleNext = () => {
        if (cupons.length === itemsPerPage) setPage((old) => old + 1);
    };

    const handlePrev = () => {
        setPage((old) => Math.max(old - 1, 1));
    };

    const openModal = (cupom: any) => {
        setSelectedCupom(cupom);
        setIsModalOpen(true);
        setIsCopied(false);
    };

    const handleCopyAndRedirect = () => {
        if (selectedCupom) {
            navigator.clipboard.writeText(selectedCupom.cupom);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        }
    };

    return (
        <section className="max-w-4xl mx-auto bg-slate-50/50 p-4 md:p-8 rounded-xl">
            
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-800">
                    {titulo}
                </h1>
            </div>

            {isLoading && !isPlaceholderData ? (
                <div className="h-64 flex items-center justify-center text-slate-400">
                    Buscando os melhores cupons...
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {cupons.map((cupom: any) => (
                        <div 
                            key={cupom.id} 
                            className="flex flex-col md:flex-row items-center bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 gap-4 md:gap-6 relative overflow-hidden group hover:shadow-md transition-shadow"
                        >
                            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-50 rounded-full border border-slate-100 z-10 hidden md:block" />

                            <div className="flex flex-col items-center justify-center shrink-0 w-24">
                                <Avatar className="h-14 w-14 border border-slate-100 p-2 bg-white">
                                    <AvatarImage src={cupom.image_url} alt={cupom.affiliate} className="object-contain" />
                                    <AvatarFallback className="font-bold text-slate-400 text-xs">
                                        {cupom.affiliate?.substring(0,2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] text-slate-400 mt-2 font-medium text-center leading-tight">
                                    Cupom<br/>{cupom.affiliate}
                                </span>
                            </div>

                            <div className="w-full h-px border-t border-dashed border-slate-200 md:hidden" />

                            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                                <h3 className="text-lg font-bold text-slate-800">
                                    {cupom.title}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1 mb-2">
                                    {cupom.description}
                                </p>
                                <div className="text-2xl font-black text-slate-700">
                                    {cupom.discount > 0 ? `${cupom.discount}% de desconto` : "Aproveite agora o cupom"}
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end justify-between shrink-0 h-full gap-4 md:gap-0 mt-4 md:mt-0">
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    há pouco
                                </span>

                                <div className="relative flex items-center mt-auto cursor-pointer" onClick={() => openModal(cupom)}>
                                    <div className="border-2 border-dashed border-slate-300 text-slate-400 pl-16 pr-4 py-2.5 rounded-full text-sm font-bold tracking-widest w-40 text-right select-none">
                                        ...{cupom.cupom.slice(-3)}
                                    </div>
                                    <Button 
                                        className="absolute left-0 rounded-full bg-[#FAB610] hover:bg-[#FAA610] text-white px-6 h-full font-bold shadow-md transition-transform group-hover:scale-105"
                                    >
                                        Pegar cupom
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {cupons.length === 0 && !isLoading && (
                 <div className="text-center py-10 text-slate-500 bg-white rounded-xl border border-slate-100">
                    Nenhum cupom encontrado no momento.
                    <br />
                    <Button variant="link" onClick={() => setPage(1)}>Voltar ao início</Button>
                 </div>
            )}

            <div className="flex justify-end my-6">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrev}
                        disabled={page === 1 || isLoading}
                        className="bg-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-slate-600 bg-white px-3 py-2 rounded-md border border-slate-200">
                        Pág {page}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNext}
                        disabled={cupons.length < itemsPerPage || isLoading}
                        className="bg-white"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md text-center p-8 gap-6 border-0 shadow-2xl rounded-2xl">
                    {selectedCupom && (
                        <>
                            <DialogHeader className="flex flex-col items-center gap-4 border-b border-dashed border-slate-200 pb-6">
                                <Avatar className="h-16 w-16 border border-slate-100 p-2 shadow-sm bg-white">
                                    <AvatarImage src={selectedCupom.image_url} alt={selectedCupom.affiliate} className="object-contain" />
                                    <AvatarFallback>{selectedCupom.affiliate?.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <DialogTitle className="text-2xl font-bold text-slate-800">
                                        Cupom {selectedCupom.affiliate}
                                    </DialogTitle>
                                    <DialogDescription className="text-sm text-slate-500 mt-2">
                                        {selectedCupom.description}
                                    </DialogDescription>
                                </div>
                            </DialogHeader>

                            <div className="flex flex-col items-center gap-4 pt-2">
                                <p className="text-sm text-slate-600">
                                    Cole este código no carrinho da {selectedCupom.affiliate}
                                </p>
                                
                                <div className="border-2 border-dashed border-slate-400 bg-slate-50 text-slate-800 px-8 py-4 rounded-full text-xl font-black tracking-widest w-full text-center select-all">
                                    {selectedCupom.cupom}
                                </div>

                                <Button 
                                    onClick={handleCopyAndRedirect}
                                    className={`w-full h-14 rounded-full font-bold text-base transition-all duration-300 ${
                                        isCopied 
                                        ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
                                        : "bg-[#FAB610] hover:bg-[#FAA610] text-white"
                                    }`}
                                >
                                    {isCopied ? (
                                        <span className="flex items-center gap-2">
                                            <Check className="w-5 h-5" /> Copiado!
                                        </span>
                                    ) : (
                                        "Copiar e ver ofertas válidas"
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

        </section>
    );
}