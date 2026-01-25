export interface Usuario {
    id: number;
    nome: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    usuario: Usuario
}