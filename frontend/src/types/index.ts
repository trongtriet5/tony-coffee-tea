export type VoucherStatus = 'UNUSED' | 'USED' | 'EXPIRED';
export type PaymentMethod = 'CASH' | 'E_WALLET' | 'VOUCHER' | 'MIXED';

export interface Product {
  id: string;
  name_vi: string;
  name_en: string;
  price: number;
  category: string;
  available: boolean;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedToppings?: Topping[];
  note?: string;
}

export interface Voucher {
  id: string;
  voucher_code: string;
  employee_id: string;
  amount: number;
  status: VoucherStatus;
  expires_at: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  toppings?: { name: string; price: number }[];
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  payment_method: string;
  created_at: string;
  items: OrderItem[];
}

export interface DashboardStats {
  today_orders: number;
  today_revenue: number;
  today_discount: number;
  today_net_revenue: number;
  revenue_by_day: Array<{ date: string; revenue: number }>;
  top_products: Array<{ name: string; count: number }>;
  transaction_count_by_hour: Array<{ hour: string; count: number }>;
}

export interface VoucherStats {
  total: number;
  unused: number;
  used: number;
  expired: number;
  total_discount_given: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
