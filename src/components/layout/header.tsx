"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { cn } from "@/lib/utils";
import { pages } from "./pages";
import { Menu, Search, X } from "lucide-react"; 
import { Button } from "../ui/button";
import logo from "../../img/logo/logo.svg";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-[#065179] backdrop-blur-md supports-[backdrop-filter]:bg-[#065179]">
                
                <div className="bg-white text-[#ea580c] text-[10px] md:text-xs py-2 text-center font-bold tracking-wide">
                    Entre no nosso Grupo VIP de Ofertas e não perca nada! 
                    <span className="underline ml-2 cursor-pointer hover:text-orange-400">Clicar aqui</span>
                </div>

                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link 
                        href={"/"} 
                        className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
                    >
                        <Image src={logo} alt="Logo Martelai" className="w-24 h-auto object-contain" />
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        {pages.map((it) => (
                            <Link 
                                key={it.label} 
                                href={it.href || "/"} 
                                className="group flex items-center gap-2 text-sm font-medium text-white hover:text-orange-600 transition-colors"
                            >
                                <it.icon className={cn("h-4 w-4 transition-colors group-hover:text-orange-600", it.color)} />
                                <span>{it.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:text-orange-600">
                            <Search className="h-5 w-5" />
                        </Button>
                        
                        <button 
                            type="button"
                            className="md:hidden p-2 text-white flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-[60] md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div 
                className={cn(
                    "fixed top-0 left-0 h-full w-[70%] max-w-sm bg-[#065179] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-600/50">
                    <Image src={logo} alt="Logo Martelai" className="w-24 h-auto object-contain" />
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="flex flex-col px-4 pt-4 overflow-y-auto">
                    {pages.map((it) => (
                        <Link 
                            key={it.label} 
                            href={it.href || "/"} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="group flex items-center gap-4 py-4 text-base font-medium text-white hover:text-orange-600 transition-colors border-b border-slate-600/30 last:border-0"
                        >
                            <it.icon className={cn("h-5 w-5 transition-colors group-hover:text-orange-600", it.color)} />
                            <span>{it.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}