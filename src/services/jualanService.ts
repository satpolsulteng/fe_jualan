import { api_kepegawaian } from "@/config/api";

export const getProducts = async () => {
    const res: any = await api_kepegawaian.get('/jualan/products');
    return res || [];
};

export const createProduct = async (data: FormData) => {
    const res: any = await api_kepegawaian.post('/jualan/products', data);
    return res;
};

export const updateProduct = async (id: number, data: FormData) => {
    const res: any = await api_kepegawaian.post(`/jualan/products/${id}`, data);
    return res;
};

export const deleteProduct = async (id: number) => {
    const res: any = await api_kepegawaian.delete(`/jualan/products/${id}`);
    return res;
};

export const getTransactions = async (params?: { month?: number; year?: number }) => {
    const res: any = await api_kepegawaian.get('/jualan/transactions', { params });
    return res || [];
};

export const createTransaction = async (data: any) => {
    const res: any = await api_kepegawaian.post('/jualan/transactions', data);
    return res;
};

export const updateTransactionStatus = async (id: number, data: any) => {
    const res: any = await api_kepegawaian.post(`/jualan/transactions/${id}/status`, data);
    return res;
};

export const getRecap = async (month?: number, year?: number) => {
    const res: any = await api_kepegawaian.get('/jualan/recap', { params: { month, year } });
    return res;
};
