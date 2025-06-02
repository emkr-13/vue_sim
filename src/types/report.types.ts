import { Pagination } from './common.types';

export interface ReportFilter {
  startDate: string;
  endDate: string;
  type?: "daily" | "weekly" | "monthly" | "yearly";
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