"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { pages } from "./pages";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white">
            
            <div className="bg-slate-900 text-white text-[10px] md:text-xs py-2 text-center font-medium tracking-wide">
                Entre no nosso Grupo VIP de Ofertas e não perca nada! 
                <span className="underline ml-2 cursor-pointer hover:text-orange-400">Clicar aqui</span>
            </div>

            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                
                <div className="flex items-center gap-2">
                    <div className="bg-orange-600 p-1.5 rounded-lg">
                        <ShoppingBag className="text-white h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-800 hidden md:block">
                        Matela<span className="text-orange-600">Ai</span>
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {pages.map((it) => (
                        <Link 
                            key={it.label} 
                            href={it.href || "/"} 
                            className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
                        >
                            <it.icon className={cn("h-4 w-4 transition-colors group-hover:text-orange-600", it.color)} />
                            <span>{it.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-orange-600">
                        <Search className="h-5 w-5" />
                    </Button>
                    
                    <Button variant="ghost" size="icon" className="md:hidden text-slate-800">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

            </div>
        </header>
    )
}