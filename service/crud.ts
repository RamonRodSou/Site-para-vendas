import { categoriasData } from "@/src/components/categoriaCard/categoriasData";
import { api } from "./api";

export function crud<T>(endpoint: string, conversor?: (item: any) => T) {
        return {
        getAll: async (): Promise<T[]> => {
            try {
                const response = await api.get(`/${endpoint}?select=*`);
                return response.data;
            } catch (error) {
                console.error(`Erro no getAll de ${endpoint}:`, error);
                throw error;
            }
        },

        getAllPagined: async (page: number = 1, limit: number = 8): Promise<T[]> => {
            try {
                const offset = (page - 1) * limit;
                const response = await api.get(`/${endpoint}?select=*&limit=${limit}&offset=${offset}&order=created_at.desc`);
                
                const dados = response.data;
                return conversor ? dados.map(conversor) : dados;
            } catch (error) {
                console.error(`Erro no getAll de ${endpoint}:`, error);
                throw error;
            }
        },

        getByCategory: async (categoria: string, page: number = 1, limit: number = 8): Promise<T[]> => {
            try {
                const offset = (page - 1) * limit;
                const categoriaEncontrada = categoriasData.find(c => c.id === Number(categoria));

                const termoBusca = categoriaEncontrada ? categoriaEncontrada.name : categoria;

                const response = await api.get(
                    `/${endpoint}?select=*&category=eq.${termoBusca}&limit=${limit}&offset=${offset}&order=created_at.desc`
                );
                
                const dados = response.data;
                return conversor ? dados.map(conversor) : dados;
            } catch (error) {
                console.error(`Erro no getByCategory de ${endpoint}:`, error);
                throw error;
            }
        },

        getById: async (id: string | number): Promise<T | null> => {
            try {
                const response = await api.get(`/${endpoint}?id=eq.${id}&select=*`);
                
                if (response.data && response.data.length > 0) {
                    return response.data[0];
                }
                return null;
            } catch (error) {
                console.error(`Erro no getById de ${endpoint}:`, error);
                throw error;
            }
        },

        create: async (data: Partial<T>): Promise<T> => {
            try {
                const response = await api.post(`/${endpoint}`, data);
                return response.data[0];
            } catch (error) {
                console.error(`Erro no create de ${endpoint}:`, error);
                throw error;
            }
        },
        

        update: async (id: string | number, data: Partial<T>): Promise<T> => {
            try {
                const response = await api.patch(`/${endpoint}?id=eq.${id}`, data);
                return response.data[0];
            } catch (error) {
                console.error(`Erro no update de ${endpoint}:`, error);
                throw error;
            }
        },

        delete: async (id: string | number): Promise<void> => {
            try {
                await api.delete(`/${endpoint}?id=eq.${id}`);
            } catch (error) {
                console.error(`Erro no delete de ${endpoint}:`, error);
                throw error;
            }
        }
    };
}