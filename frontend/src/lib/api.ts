import axios from 'axios';
import type {
  Product, Topping, Voucher, Order, DashboardStats, VoucherStats, 
  PaginatedResponse, PaymentMethod, OrderType, TableStatus, Table
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL: BASE_URL, headers: { 'Content-Type': 'application/json' } });

// ============== Products & Toppings ==============
export const getProducts = (params?: { all?: boolean }): Promise<Product[]> => api.get('/products', { params }).then((r) => r.data);
export const createProduct = (data: Omit<Product, 'id'>): Promise<Product> => api.post('/products', data).then((r) => r.data);
export const updateProduct = (id: string, data: Partial<Product>): Promise<Product> => api.put(`/products/${id}`, data).then((r) => r.data);
export const getCategories = (): Promise<{ category: string; count: number }[]> => api.get('/products/categories').then((r) => r.data);
export const getToppings = (params?: { all?: boolean }): Promise<Topping[]> => api.get('/products/toppings', { params }).then((r) => r.data);
export const createTopping = (data: Omit<Topping, 'id'>): Promise<Topping> => api.post('/products/toppings', data).then((r) => r.data);
export const updateTopping = (id: string, data: Partial<Topping>): Promise<Topping> => api.put(`/products/toppings/${id}`, data).then((r) => r.data);

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
  order_type?: 'TAKEAWAY' | 'DINE_IN';
  table_id?: string;
}

export const createOrder = (data: CreateOrderPayload): Promise<Order> => api.post('/orders', data).then((r) => r.data);
export const getOrders = (params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResponse<Order>> => api.get('/orders', { params }).then((r) => r.data);
export const getOrder = (id: string): Promise<Order> => api.get(`/orders/${id}`).then((r) => r.data);
export const addItemsToOrder = (id: string, items: any[], paymentMethod?: string): Promise<Order> => api.post(`/orders/${id}/items`, { items, payment_method: paymentMethod }).then((r) => r.data);
export const getDashboardStats = (params?: { startDate?: string; endDate?: string }): Promise<DashboardStats> => api.get('/orders/dashboard', { params }).then((r) => r.data);

// ============== Materials & Inventory ==============
export interface Material {
  id: string;
  name: string;
  unit: string;
  cost_per_unit: number;
  stock_current: number;
  stock_value: number;
  created_at: Date;
}

export interface MaterialTransaction {
  id: string;
  material_id: string;
  type: 'IN' | 'OUT' | 'ADJUST' | 'USED';
  quantity: number;
  note?: string;
  created_at: Date;
}

export const getMaterials = (): Promise<Material[]> => api.get('/materials').then((r) => r.data);
export const createMaterial = (data: { name: string; unit: string; cost_per_unit: number; initial_stock?: number }): Promise<Material> => api.post('/materials', data).then((r) => r.data);
export const updateMaterial = (id: string, data: Partial<Material>): Promise<Material> => api.put(`/materials/${id}`, data).then((r) => r.data);
export const deleteMaterial = (id: string): Promise<void> => api.delete(`/materials/${id}`).then((r) => r.data);
export const addMaterialTransaction = (data: { material_id: string; type: 'IN' | 'OUT' | 'ADJUST' | 'USED'; quantity: number; note?: string }): Promise<any> => api.post('/materials/transactions/add', data).then((r) => r.data);
export const getMaterialTransactions = (id: string, limit?: number): Promise<MaterialTransaction[]> => api.get(`/materials/${id}/transactions`, { params: { limit } }).then((r) => r.data);
export const getInventoryReport = (params?: { startDate?: string; endDate?: string }): Promise<any> => api.get('/materials/reports/inventory', { params }).then((r) => r.data);

// ============== Recipes (BOM) ==============
export interface Recipe {
  id: string;
  product_id?: string;
  topping_id?: string;
  material_id: string;
  quantity: number;
}

export const createProductRecipe = (data: { product_id: string; material_id: string; quantity: number }): Promise<any> => api.post('/recipes/products', data).then((r) => r.data);
export const getProductRecipes = (productId: string): Promise<any[]> => api.get(`/recipes/products/${productId}`).then((r) => r.data);
export const getCompleteProductRecipe = (productId: string): Promise<any> => api.get(`/recipes/products/${productId}/complete`).then((r) => r.data);
export const updateProductRecipe = (id: string, quantity: number): Promise<any> => api.put(`/recipes/products/${id}`, { quantity }).then((r) => r.data);
export const deleteProductRecipe = (id: string): Promise<void> => api.delete(`/recipes/products/${id}`).then((r) => r.data);
export const createToppingRecipe = (data: { topping_id: string; material_id: string; quantity: number }): Promise<any> => api.post('/recipes/toppings', data).then((r) => r.data);
export const getToppingRecipes = (toppingId: string): Promise<any[]> => api.get(`/recipes/toppings/${toppingId}`).then((r) => r.data);
export const updateToppingRecipe = (id: string, quantity: number): Promise<any> => api.put(`/recipes/toppings/${id}`, { quantity }).then((r) => r.data);
export const deleteToppingRecipe = (id: string): Promise<void> => api.delete(`/recipes/toppings/${id}`).then((r) => r.data);

// (Table interface is now imported from types/index.ts)

export const getTables = (): Promise<Table[]> => api.get('/tables').then((r) => r.data);
export const getAvailableTables = (): Promise<Table[]> => api.get('/tables/available').then((r) => r.data);
export const createTable = (data: { name: string }): Promise<Table> => api.post('/tables', data).then((r) => r.data);
export const updateTable = (id: string, data: Partial<Table>): Promise<Table> => api.put(`/tables/${id}`, data).then((r) => r.data);
export const deleteTable = (id: string): Promise<void> => api.delete(`/tables/${id}`).then((r) => r.data);
export const occupyTable = (id: string): Promise<Table> => api.post(`/tables/${id}/occupy`, {}).then((r) => r.data);
export const releaseTable = (id: string): Promise<Table> => api.post(`/tables/${id}/release`, {}).then((r) => r.data);
export const getTableOccupancy = (): Promise<any> => api.get('/tables/occupancy-status').then((r) => r.data);

export default api;

