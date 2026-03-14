"use client";

import Link from "next/link";
import Image from "next/image"; 
import { cn } from "@/lib/utils";
import { pages } from "./pages";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../img/logo/logo.svg";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#065179] backdrop-blur-md supports-[backdrop-filter]:bg-[#065179]">
            
            <div className="bg-white text-[#ea580c] text-[10px] md:text-xs py-2 text-center font-bold tracking-wide">
                Entre no nosso Grupo VIP de Ofertas e não perca nada! 
                <span className="underline ml-2 cursor-pointer hover:text-orange-400">Clicar aqui</span>
            </div>

            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link 
                    href={"/"} 
                    className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Image src={logo} alt="Logo Martelai" className="w-25 h40 object-contain" />
                    </div>
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
                    
                    <Button variant="ghost" size="icon" className="md:hidden text-white">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

            </div>
        </header>
    )
}