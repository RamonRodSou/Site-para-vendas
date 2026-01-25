"use client";

import { useState } from "react";
import { 
    Plus, Search, MoreHorizontal, Car, FileEdit, Trash2, 
    ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { stringUtil } from "@/lib/stringUtils";
import { produtoService } from "@/service/produto/ProdutoService";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/src/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { MoneyUtils } from "@/lib/moneyUtils";
import { DateUtils } from "@/lib/dataUtils";

export default function Produtos() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState(stringUtil.EMPTY);

    const { data: produtos = [], isLoading } = useQuery({
        queryKey: ['produtos'],
        queryFn: produtoService.getAll,
        staleTime: 1000 * 60 * 5,
    });

    const deleteMutation = useMutation({
        mutationFn: produtoService.delete,
        onMutate: () => {
            const toastId = toast.loading("Excluindo produto...");
            return { toastId };
        },
        onSuccess: (_, __, context) => {
            toast.dismiss(context?.toastId);
            toast.success("Produto excluído com sucesso");
            queryClient.invalidateQueries({ queryKey: ['produtos'] });
        },
        onError: (_, __, context) => {
            toast.dismiss(context?.toastId);
            toast.error("Erro ao excluir produto");
        }
    });

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        deleteMutation.mutate(id);
    }

    const filteredProducts = produtos.filter(p => 
        p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 p-4 md:p-8 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
                    <p className="text-muted-foreground">
                        Gerencie o estoque e integrações.
                    </p>
                </div>
                <Link href="/dashboard/produtos/form">
                    <Button >
                        <Plus className="mr-2 h-4 w-4" /> Novo Produto
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="flex items-center p-4 border-b">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Filtrar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Foto</TableHead>
                                <TableHead>Produto / Detalhes</TableHead>
                                <TableHead className="hidden md:table-cell">Preço Original</TableHead>
                                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                                <TableHead className="hidden lg:table-cell">Criado em</TableHead>
                                <TableHead className="w-[50px]"></TableHead> {/* Coluna de Ações */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Carregando estoque...
                                    </TableCell>
                                </TableRow>
                            ) : filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Nenhum produto encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((it) => (
                                    <TableRow key={it.id}>
                                        <TableCell>
                                            <Avatar className="h-10 w-10 rounded-lg border border-slate-100">
                                                <AvatarImage 
                                                    src={it.image_url} 
                                                    alt={it.title} 
                                                    className="object-contain bg-white" 
                                                />
                                                <AvatarFallback className="rounded-lg bg-slate-100">
                                                    <Car className="h-5 w-5 text-slate-400" />
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>

                                        <TableCell className="max-w-[300px]">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium truncate" title={it.title}>
                                                    {it.title}
                                                </span>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="font-bold text-green-600">
                                                        {MoneyUtils.formatToReal(it.current_price)}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                                        -{it.discount}%
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell text-sm text-slate-500 line-through">
                                            {MoneyUtils.formatToReal(it.original_price)}
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell">
                                            <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/10">
                                                {it.category}
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell text-xs text-slate-500">
                                            {DateUtils.dateFormated(it.created_at)}
                                        </TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                                        <span className="sr-only">Abrir menu</span>
                                                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem 
                                                        onClick={() => navigator.clipboard.writeText(String(it.id))}
                                                        className="cursor-pointer"
                                                    >
                                                        Copiar ID
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    
                                                    <Link href={`/dashboard/produtos/form/${it.id}`} className="w-full">
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <FileEdit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                    </Link>

                                                    {it.affiliate_link && (
                                                        <a href={it.affiliate_link} target="_blank" rel="noopener noreferrer">
                                                            <DropdownMenuItem className="cursor-pointer">
                                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                                Ver na Loja
                                                            </DropdownMenuItem>
                                                        </a>
                                                    )}
                                                    
                                                    <DropdownMenuSeparator />
                                                    
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDelete(it.id)}
                                                        className="text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}