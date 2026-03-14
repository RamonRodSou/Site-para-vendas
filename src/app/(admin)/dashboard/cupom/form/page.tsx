"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CupomFormData, cupomSchema } from "@/schema/cupomSchema"; 
import { cupomService } from "@/service/cupom/CupomService";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { TicketPercent } from "lucide-react"; 
import { stringUtil } from "@/lib/stringUtils";
import { Affiliate } from "@/types/logoAffiliate/affiliate";

export default function NovoCupom() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(cupomSchema),
        defaultValues: {
            title: stringUtil.EMPTY,
            description: stringUtil.EMPTY,
            discount: 0,
            image_url: stringUtil.EMPTY,
            affiliate: Affiliate.OUTROS,
            cupom: stringUtil.EMPTY,
        },
    });

    async function onSubmit(data: CupomFormData) {
        try {
            const nomeAffiliate = Affiliate[data.affiliate];
            const dataAtual = new Date().toISOString();

            const payloadParaSalvar = {
                ...data,                
                affiliate: nomeAffiliate, 
                created_at: dataAtual,   
                updated_at: dataAtual,   
            };

            console.log("Enviando Payload Final:", payloadParaSalvar);
            
            await cupomService.create(payloadParaSalvar); 
            
            // toast.success("Cupom cadastrado com sucesso!");
            // router.push("/dashboard/cupom");
            
        } catch (error) {
            console.error(error);
            toast.error("Erro ao cadastrar cupom. Tente novamente.");
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <Card className="shadow-md border-slate-200">
                        <CardHeader className="pb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-600 rounded-xl shadow-sm">
                                    <TicketPercent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-slate-800">Novo Cupom</CardTitle>
                                    <CardDescription>Cadastre um novo cupom de desconto promocional.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-8 space-y-8">
                            
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2 mb-4">
                                    Informações do Cupom
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="title" render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Título / Loja</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Cupom de 15% na Amazon" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Descrição / Regras</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Válido para a primeira compra no site..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField
                                        control={form.control}
                                        name="affiliate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Afiliado</FormLabel>
                                                <Select 
                                                    onValueChange={(value) => field.onChange(Number(value))} 
                                                    value={field.value?.toString()} 
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.entries(Affiliate)
                                                            .filter(([key]) => isNaN(Number(key)))
                                                            .map(([key, value]) => (
                                                                <SelectItem key={key} value={value.toString()}>
                                                                    {key}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2 mb-4">
                                    Dados do Desconto
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    <FormField control={form.control} name="cupom" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold text-blue-600">Código do Cupom</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: PRIMEIRACOMPRA10" className="uppercase font-semibold tracking-wide" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="discount" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Desconto (%)</FormLabel>
                                            <div className="relative">
                                                <Input 
                                                    className="pl-9" 
                                                    type="number" 
                                                    {...field} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                    placeholder="0"
                                                />
                                                <span className="absolute right-3 top-2.5 text-slate-400 text-sm font-bold">%</span>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t mt-8">
                                <Button variant="outline" type="button" onClick={() => router.back()} className="w-full sm:w-32">
                                    Cancelar
                                </Button>
                                <Button type="submit" className="w-full sm:w-48 bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md">
                                    Salvar Cupom
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}