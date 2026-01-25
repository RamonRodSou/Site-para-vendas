// import { LoginResponse, Usuario } from "@/src/types/auth/auth";
// import { api } from "./api";
// import { destroyCookie } from "nookies";

// export const authService = {
//     login: async (credentials: {email: string, senha: string}): Promise<LoginResponse> => {
//         const response = await api.post<LoginResponse>('/auth/login', credentials);
//         return response.data;
//     },

//     getMe: async (): Promise<Usuario> => {
//         const response = await api.get<Usuario>('/auth/me'); 
//         return response.data;
//     },

//     logout: () => {
//         destroyCookie(null, 'crm_token', { path: '/' });
//         window.location.href = '/login'; 
//     }
// }

import { destroyCookie, setCookie, parseCookies } from "nookies";
import { USUARIOS_PERMITIDOS } from "./loginDB";
import { LoginResponse, Usuario } from "@/types/auth/auth";

export const authService = {
    login: async (credentials: { email: string, senha: string }): Promise<LoginResponse> => {
        
        await new Promise(resolve => setTimeout(resolve, 500));

        const usuarioEncontrado = USUARIOS_PERMITIDOS.find(
            u => u.email === credentials.email && u.senha === credentials.senha
        );

        if (usuarioEncontrado) {
            const fakeToken = `token-falso-${window.btoa(JSON.stringify(usuarioEncontrado))}`;
            
            return {
                token: fakeToken,
                usuario: {
                    id: usuarioEncontrado.id,
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    role: usuarioEncontrado.role
                }
            };
        }

        throw new Error("Credenciais inválidas");
    },

    getMe: async (): Promise<Usuario> => {
        
        return {
            id: 1,
            nome: "Usuário Logado",
            email: "admin@sistema.com",
            role: "admin"
        };
    },

    logout: () => {
        destroyCookie(null, 'crm_token', { path: '/' });
        window.location.href = '/login';
    }
}