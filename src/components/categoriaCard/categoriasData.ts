
import acessorioImg from "@/src/img/categoria/1-acessorios.webp";
import consumiveisImg from "@/src/img/categoria/2-consumiveis.webp";
import eletricaImg from "@/src/img/categoria/3-eletrica.webp";
import epcImg from "@/src/img/categoria/4-epc.webp";
import epiImg from "@/src/img/categoria/5-epi.webp";
import manualImg from "@/src/img/categoria/6-manual.webp";
import obraImg from "@/src/img/categoria/7-obra.webp";
import outrosImg from "@/src/img/categoria/8-outros.webp";
import trasnsporteImg from "@/src/img/categoria/9-trasnsporte.webp";
import medicaoImg from "@/src/img/categoria/10-medicao.webp";
import { Categoria } from "@/types/produto/categoria";

export const categoriasData = [
    { id: 1, name: Categoria.ACESSORIOS, imageUrl: acessorioImg, label: "Acessórios" },
    { id: 2, name: Categoria.CONSUMIVEIS, imageUrl: consumiveisImg, label: "Consumíveis" },
    { id: 3, name: Categoria.ELETRICA, imageUrl: eletricaImg, label: "Elétrica" },
    { id: 4, name: Categoria.EPC, imageUrl: epcImg, label: "EPC" },
    { id: 5, name: Categoria.EPI, imageUrl: epiImg, label: "EPI" },
    { id: 6, name: Categoria.MANUAL, imageUrl: manualImg, label: "Ferramentas Manuais" },
    { id: 7, name: Categoria.MEDICAO, imageUrl: medicaoImg, label: "Medição" },
    { id: 8, name: Categoria.OBRA, imageUrl: obraImg, label: "Obra" },
    { id: 9, name: Categoria.OUTROS, imageUrl: outrosImg, label: "Outros" },
    { id: 10, name: Categoria.TRANSPORTE, imageUrl: trasnsporteImg, label: "Transporte" }
];