"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProdutoFormData, produtoSchema } from "@/schema/produtoSchema"; 
import { produtoService } from "@/service/produto/ProdutoService";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Package, Link as LinkIcon, Store } from "lucide-react";
import { stringUtil } from "@/lib/stringUtils";
import { ImageUpload } from "@/src/components/image-upload/image-upload";
import { Categoria } from "@/src/types/produto/categoria";
import { imageLogoAffiliate } from "@/src/types/logoAffiliate/imageLogoAffiliate";

export default function NovoProduto() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(produtoSchema),
        defaultValues: {
            title: stringUtil.EMPTY,
            original_price: 0,
            current_price: 0,
            discount: 0,
            image_url: stringUtil.EMPTY,
            store_name: stringUtil.EMPTY,
            store_logo: stringUtil.EMPTY,
            affiliate_link: stringUtil.EMPTY,
            category: Categoria.OUTROS,
        },
    });

    async function onSubmit(data: ProdutoFormData) {
    try {
        console.log("Enviando:", data);
        const nomeCategoria = Categoria[data.category];

        const dataAtual = new Date().toISOString();

        const payloadParaSalvar = {
            ...data,                
            category: nomeCategoria, 
            created_at: dataAtual,   
            updated_at: dataAtual,   
        };

        console.log("Enviando Payload Final:", payloadParaSalvar);
        
        await produtoService.create(payloadParaSalvar); 
        
        toast.success("Produto cadastrado com sucesso!");
        router.push("/dashboard/produtos");
        
    } catch (error) {
        console.error(error);
        toast.error("Erro ao cadastrar produto. Tente novamente.");
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
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold text-slate-800">Novo Produto</CardTitle>
                                    <CardDescription>Cadastre uma nova oferta de afiliado.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-8 space-y-8">
                            
                            <FormField
                                control={form.control}
                                name="image_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <Card className="border-dashed border-2 bg-slate-50/50">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base">Foto do Produto</CardTitle>
                                                <CardDescription>
                                                    A imagem será salva automaticamente após o upload.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <FormControl>
                                                    <ImageUpload
                                                        tenantId={"martelai"}
                                                        initialUrls={field.value ? [field.value] : []}
                                                        onUploadComplete={(urls) => {
                                                            const url = urls[0] || stringUtil.EMPTY;
                                                            field.onChange(url);
                                                        }} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </CardContent>
                                        </Card>
                                    </FormItem>
                                )}
                            />
                            
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2 mb-4">
                                    Informações do Produto
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="title" render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Nome do Produto</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: Furadeira de Impacto Bosch 127v" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Categoria</FormLabel>
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
                                                        {Object.entries(Categoria)
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
                                    Valores e Descontos
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    
                                    <FormField control={form.control} name="original_price" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preço Original (De)</FormLabel>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-medium">R$</span>
                                                <Input 
                                                    className="pl-9" 
                                                    type="number" 
                                                    {...field} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="current_price" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold text-green-700">Preço Atual (Por)</FormLabel>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-green-600 text-sm font-medium">R$</span>
                                                <Input 
                                                    className="pl-9 font-bold text-green-700 bg-green-50" 
                                                    type="number" 
                                                    {...field} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </div>
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

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2 mb-4">
                                    Dados da Loja
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <FormItem>
                                        <FormLabel className="text-blue-600 font-bold">Selecione a Loja Parceira (Rápido)</FormLabel>
                                        <Select 
                                            onValueChange={(selectedId) => {
                                                const lojaSelecionada = imageLogoAffiliate.find(
                                                    item => item.id.toString() === selectedId
                                                );

                                                if (lojaSelecionada) {
                                                    form.setValue("store_name", lojaSelecionada.label);
                                                    form.setValue("store_logo", lojaSelecionada.imageUrl);
                                                }
                                            }}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Escolha a loja..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {imageLogoAffiliate.map((loja) => (
                                                    <SelectItem key={loja.id} value={loja.id.toString()}>
                                                        <div className="flex items-center gap-2">
                                                            <img src={loja.imageUrl} alt={loja.label} className="w-5 h-5 object-contain" />
                                                            {loja.label}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-[0.8rem] text-muted-foreground mt-1">
                                            Preenche o nome e a logo automaticamente.
                                        </p>
                                    </FormItem>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                                        
                                        <FormField control={form.control} name="store_name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    <Store className="w-4 h-4 text-slate-400" /> Nome da Loja
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: Amazon" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="store_logo" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>URL Logo da Loja</FormLabel>
                                                <FormControl>
                                                    <div className="flex gap-2">
                                                        <Input placeholder="https://..." {...field} />
                                                        {field.value && (
                                                            <div className="w-10 h-10 border rounded p-1 flex items-center justify-center bg-white shrink-0">
                                                                <img src={field.value} alt="Preview" className="max-w-full max-h-full object-contain" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <FormField control={form.control} name="affiliate_link" render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel className="flex items-center gap-2 font-bold text-blue-600">
                                                <LinkIcon className="w-4 h-4" /> Link de Afiliado (Onde o usuário compra)
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://amzn.to/..." className="border-blue-200 bg-blue-50/30 text-blue-800" {...field} />
                                            </FormControl>
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
                                    Salvar Produto
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}