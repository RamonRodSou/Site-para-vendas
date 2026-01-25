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

import { destroyCookie, parseCookies } from "nookies";
import { USUARIOS_PERMITIDOS } from "./loginDB";
import { LoginResponse, Usuario } from "@/types/auth/auth";

export const authService = {
    login: async (credentials: { email: string, senha: string }): Promise<LoginResponse> => {
        
        await new Promise(resolve => setTimeout(resolve, 500));

        const usuarioEncontrado = USUARIOS_PERMITIDOS.find(
            u => u.email === credentials.email && u.senha === credentials.senha
        );

        if (usuarioEncontrado) {
            const userPayload = {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                role: usuarioEncontrado.role
            };

            const fakeToken = `token-falso-${window.btoa(JSON.stringify(userPayload))}`;
            
            return {
                token: fakeToken,
                usuario: userPayload
            };
        }

        throw new Error("Credenciais inválidas");
    },

    getMe: async (): Promise<Usuario> => {
        const cookies = parseCookies();
        const token = cookies['crm_token'];

        if (!token) {
            throw new Error("Usuário não autenticado");
        }

        try {
            const base64String = token.replace('token-falso-', '');

            const jsonString = window.atob(base64String);

            const usuario: Usuario = JSON.parse(jsonString);

            return usuario;
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            throw new Error("Token inválido");
        }
    },

    logout: () => {
        destroyCookie(null, 'crm_token', { path: '/painelAdmin/*' });
        window.location.href = '/painelAdmin';
    }
}