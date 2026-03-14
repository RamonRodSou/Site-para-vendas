"use client";

import { useState } from "react";
import { 
    Plus, Search, MoreHorizontal, FileEdit, Trash2, 
    TicketPercent, Copy
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { stringUtil } from "@/lib/stringUtils";
import { cupomService } from "@/service/cupom/CupomService"
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

export default function Cupons() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState(stringUtil.EMPTY);

    const { data: cupons = [], isLoading } = useQuery({
        queryKey: ['cupons'],
        queryFn: cupomService.getAll,
        staleTime: 1000 * 60 * 5,
    });

    const deleteMutation = useMutation({
        mutationFn: cupomService.delete,
        onMutate: () => {
            const toastId = toast.loading("Excluindo cupom...");
            return { toastId };
        },
        onSuccess: (_, __, context) => {
            toast.dismiss(context?.toastId);
            toast.success("Cupom excluído com sucesso");
            queryClient.invalidateQueries({ queryKey: ['cupons'] });
        },
        onError: (_, __, context) => {
            toast.dismiss(context?.toastId);
            toast.error("Erro ao excluir cupom");
        }
    });

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir este cupom?")) return;
        deleteMutation.mutate(id);
    }

    const filteredCupons = cupons.filter(c => 
        c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.cupom?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 p-4 md:p-8 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cupons</h1>
                    <p className="text-muted-foreground">
                        Gerencie seus cupons de desconto promocionais.
                    </p>
                </div>
                <Link href="/dashboard/cupom/form">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="mr-2 h-4 w-4" /> Novo Cupom
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="flex items-center p-4 border-b">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Filtrar por nome ou código..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]"></TableHead>
                                <TableHead>Título / Descrição</TableHead>
                                <TableHead className="hidden md:table-cell">Código</TableHead>
                                <TableHead className="hidden sm:table-cell">Desconto</TableHead>
                                <TableHead className="hidden lg:table-cell">Categoria</TableHead>
                                <TableHead className="w-[50px]"></TableHead> 
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Carregando cupons...
                                    </TableCell>
                                </TableRow>
                            ) : filteredCupons.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Nenhum cupom encontrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCupons.map((it) => (
                                    <TableRow key={it.id}>
                                        <TableCell>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                                <TicketPercent className="h-5 w-5" />
                                            </div>
                                        </TableCell>

                                        <TableCell className="max-w-[250px] md:max-w-[300px]">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium truncate" title={it.title}>
                                                    {it.title}
                                                </span>
                                                <span className="text-xs text-muted-foreground truncate" title={it.description}>
                                                    {it.description}
                                                </span>
                                                {/* Exibe o código no mobile, já que a coluna Código é escondida em telas pequenas */}
                                                <span className="md:hidden inline-flex items-center mt-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm w-fit">
                                                    {it.cupom}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200 uppercase tracking-wider">
                                                {it.cupom}
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <span className="font-bold text-green-600 text-sm">
                                                {it.discount}% OFF
                                            </span>
                                        </TableCell>

                                        <TableCell className="hidden lg:table-cell">
                                            <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/10">
                                                {it.affiliate}
                                            </span>
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
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(String(it.cupom));
                                                            toast.success("Código copiado!");
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        <Copy className="mr-2 h-4 w-4" />
                                                        Copiar Código
                                                    </DropdownMenuItem>
                                                    
                                                    <DropdownMenuSeparator />
                                                    
                                                    {/* Rota ajustada para a edição de cupons */}
                                                    <Link href={`/dashboard/cupons/form/${it.id}`} className="w-full">
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <FileEdit className="mr-2 h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                    </Link>

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