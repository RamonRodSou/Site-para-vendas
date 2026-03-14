import { crud } from "../crud";
import { Cupom } from "@/types/cupom/cupom";

export const cupomService = crud<Cupom>("cupons");
