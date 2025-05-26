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
  totalUsers: number;
  totalProducts: number;
  totalCategories: number;
  totalStores: number;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}

export interface DashboardSpecificSummary {
  salesTotal: number;
  purchasesTotal: number;
  transactionsCount: number;
  recentTransactions: Transaction[];
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
    products: Product[];
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
