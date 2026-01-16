import { api } from "./api";

export function crud<T> (path: string) {
    return {
        getAll: async (): Promise<T[]> => {
            const response = await api.get(`/${path}`);
            console.log(response)
            return response.data;
        },

        getById: async (id: number | string): Promise<T> => {
            const response = await api.get(`/${path}/${id}`);
            return response.data;
        },
    }
};