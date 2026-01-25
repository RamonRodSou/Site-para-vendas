"use client";

import CategoriaCard from "@/src/components/categoriaCard/categoriaCard";
import ListaProdutos from "@/src/components/listaProdutos/listaProdutos";
import { useParams } from "next/navigation";

export default function CategoriaData() {

    const params = useParams();
    const dataId = params.id as string;

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col md:block space-y-10">
            <ListaProdutos 
                titulo={dataId} 
                itemsPerPage={8} 
                categoria={dataId} 
            />
            <CategoriaCard />
        </main>
    );
}