import { Produto } from "@/types/produto/produto";
import { crud } from "../crud";

export const produtoService = crud<Produto>("produtos");
