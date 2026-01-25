import CategoriaCard from "@/src/components/categoriaCard/categoriaCard";
import ListaProdutos from "@/src/components/listaProdutos/listaProdutos";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col md:block space-y-10">
        <ListaProdutos 
            titulo="Promoções do Dia" 
            itemsPerPage={8} 
        />
        <CategoriaCard />
    </main>
  );
}