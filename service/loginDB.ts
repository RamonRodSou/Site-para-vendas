import { Usuario } from "@/types/auth/auth";

interface UsuarioAuth extends Usuario {
    senha: string;
}

export const USUARIOS_PERMITIDOS: UsuarioAuth[] = [
    {
        id: 1,
        nome: "Samara Rodrigues",
        email: "samara@vendas.com.br",
        role: "admin",
        senha: "senha123",
    },
    {
        id: 2,
        nome: "Adriana Conceição",
        email: "drika@vendas.com.br",
        role: "admin",
        senha: "senha456",
    }
];