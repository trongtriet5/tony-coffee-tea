export type VoucherStatus = 'UNUSED' | 'USED' | 'EXPIRED';
export type PaymentMethod = 'CASH' | 'E_WALLET' | 'VOUCHER' | 'MIXED';
export type OrderType = 'TAKEAWAY' | 'DINE_IN';
export type MaterialTransactionType = 'IN' | 'OUT' | 'ADJUST' | 'USED';
export type TableStatus = 'AVAILABLE' | 'OCCUPIED';

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

export interface Employee {
  id: string;
  name: string;
  position_name: string;
  role: 'STAFF' | 'MANAGER' | 'HOD';
  is_official: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedToppings?: Topping[];
  note?: string;
  isExisting?: boolean;
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
  order_type: OrderType;
  table_id?: string;
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
  transaction_count_by_hour: Array<{ hour: string; products: number; toppings: number }>;
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

// ============== Material & Inventory ==============
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
  type: MaterialTransactionType;
  quantity: number;
  note?: string;
  created_at: Date;
}

export interface Recipe {
  id: string;
  product_id?: string;
  topping_id?: string;
  material_id: string;
  quantity: number;
}

// ============== Table Management ==============
export interface Table {
  id: string;
  name: string;
  status: TableStatus;
  current_order?: {
    id: string;
    order_number: string;
    order_type: OrderType;
  };
}

