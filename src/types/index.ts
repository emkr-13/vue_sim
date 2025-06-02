export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface UserProfile {
  email: string;
  fullname: string;
  usercreated: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  location: string;
  manager: string;
  contactInfo: string | null;
  phone: string | null;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Account {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: "supplier" | "customer";
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price_sell: string;
  price_cost: string;
  satuan: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardGeneralSummary {
  total_customers: string;
  total_suppliers: string;
  total_stores: string;
  total_products: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}

export interface DashboardSpecificSummary {
  total_quotations: string;
  total_purchases: string;
  total_stock_movements_in: string;
  total_stock_movements_out: string;
  time_filter: string;
}

export interface Pagination {
  total_data: string;
  total_page: number;
  total_display: number;
  first_page: boolean;
  last_page: boolean;
  prev: number;
  current: number;
  next: number;
  detail: number[];
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    data: Category[];
    pagination: Pagination;
  };
}

export interface CategoryDetailResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface StoresResponse {
  success: boolean;
  message: string;
  data: {
    data: Store[];
    pagination: Pagination;
  };
}

export interface StoreDetailResponse {
  success: boolean;
  message: string;
  data: Store;
}

export interface AccountsResponse {
  success: boolean;
  message: string;
  data: {
    data: Account[];
    pagination: Pagination;
  };
}

export interface AccountDetailResponse {
  success: boolean;
  message: string;
  data: Account;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: Product[];
    pagination: Pagination;
  };
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface DashboardGeneralResponse {
  success: boolean;
  message: string;
  data: DashboardGeneralSummary;
}

export interface DashboardSpecificResponse {
  success: boolean;
  message: string;
  data: DashboardSpecificSummary;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: number;
}

export interface CreateStoreRequest {
  name: string;
  description: string;
  location: string;
  manager: string;
  contactInfo?: string;
  phone?: string;
  email: string;
  address: string;
}

export interface UpdateStoreRequest extends CreateStoreRequest {
  id: number;
}

export interface CreateAccountRequest {
  name: string;
  type: "supplier" | "customer";
  phone: string;
  email: string;
  address: string;
}

export interface UpdateAccountRequest extends CreateAccountRequest {
  id: number;
}

export interface CreateProductRequest {
  name: string;
  categoryId: string;
  price: number;
  satuan: string;
  description: string;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  satuan: string;
  description: string;
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  storeId?: number;
  categoryId?: number;
  accountId?: number;
}

export interface SalesReportItem {
  id: string;
  date: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  customerName: string;
  storeName: string;
}

export interface PurchaseReportItem {
  id: string;
  date: string;
  productName: string;
  quantity: number;
  unitCost: number;
  total: number;
  supplierName: string;
  storeName: string;
}

export interface InventoryReportItem {
  id: string;
  productName: string;
  sku: string;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  lastRestockDate: string;
}

export interface ReportSummary {
  totalTransactions: number;
  totalAmount: number;
  averageTransactionValue: number;
  topProducts: Array<{
    productName: string;
    quantity: number;
    total: number;
  }>;
  topCategories: Array<{
    categoryName: string;
    total: number;
  }>;
}

export interface SalesReportResponse {
  success: boolean;
  message: string;
  data: {
    items: SalesReportItem[];
    summary: ReportSummary;
    pagination: Pagination;
  };
}

export interface PurchaseReportResponse {
  success: boolean;
  message: string;
  data: {
    items: PurchaseReportItem[];
    summary: ReportSummary;
    pagination: Pagination;
  };
}

export interface InventoryReportResponse {
  success: boolean;
  message: string;
  data: {
    items: InventoryReportItem[];
    summary: {
      totalProducts: number;
      totalValue: number;
      lowStockItems: number;
    };
    pagination: Pagination;
  };
}
