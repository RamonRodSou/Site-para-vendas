import { Produto } from "@/src/types/produto/produto";
import { crud } from "../crud";

export const produtoService = crud<Produto>("produtos");
