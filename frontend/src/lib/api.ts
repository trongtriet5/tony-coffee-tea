import axios from 'axios';
import type {
  Product, Topping, Voucher, Order, DashboardStats, VoucherStats, 
  PaginatedResponse, PaymentMethod
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL: BASE_URL, headers: { 'Content-Type': 'application/json' } });

// ============== Products & Toppings ==============
export const getProducts = (): Promise<Product[]> => api.get('/products').then((r) => r.data);
export const getCategories = (): Promise<{ category: string; count: number }[]> => api.get('/products/categories').then((r) => r.data);
export const getToppings = (): Promise<Topping[]> => api.get('/products/toppings').then((r) => r.data);

// ============== Vouchers ==============
export const createVoucher = (data: { employee_id: string; amount: number; voucher_type?: string }) => api.post('/voucher/create', data).then((r) => r.data);
export const getVoucherStatus = (code: string): Promise<Voucher> => api.get(`/voucher/status/${code}`).then((r) => r.data);
export const validateVoucher = (code: string): Promise<Voucher> => api.get(`/voucher/validate/${code}`).then((r) => r.data);
export const getVouchers = (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Voucher>> => api.get('/voucher', { params }).then((r) => r.data);
export const getVoucherStats = (): Promise<VoucherStats> => api.get('/voucher/stats').then((r) => r.data);

// ============== Orders ==============
export interface CreateOrderPayload {
  items: { product_id: string; quantity: number; topping_ids?: string[]; note?: string }[];
  voucher_codes?: string[];
  payment_method: string;
}

export const createOrder = (data: CreateOrderPayload): Promise<Order> => api.post('/orders', data).then((r) => r.data);
export const getOrders = (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Order>> => api.get('/orders', { params }).then((r) => r.data);
export const getDashboardStats = (params?: { startDate?: string; endDate?: string }): Promise<DashboardStats> => api.get('/orders/dashboard', { params }).then((r) => r.data);

export default api;
