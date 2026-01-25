"use client";

import { LogOut, User } from "lucide-react";

import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function HeaderAdmin() {
    const { usuario, logout } = useAuthStore();

    function getIniciais(nome?: string) {
        if (!nome) return "US";
        
        const nomes = nome.trim().split(" ");
        const primeiroNome = nomes[0];
        const ultimoNome = nomes[nomes.length - 1];

        if (nomes.length === 1) {
            return primeiroNome.substring(0, 2).toUpperCase();
        }
        
        return `${primeiroNome[0]}${ultimoNome[0]}`.toUpperCase();
    }

    return (
        <div className="flex items-center p-4 border-b h-16 justify-end bg-white dark:bg-slate-950">
            <div className="flex items-center gap-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" alt={usuario?.nome} />
                                
                                <AvatarFallback className="bg-sky-500 text-white">
                                    {getIniciais(usuario?.nome)}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {usuario?.nome || "Carregando..."}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {usuario?.email || "..."}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Meu Perfil</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}