import { Pagination } from './common.types';

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  status: "draft" | "sent" | "approved" | "rejected";
  total: number;
  notes: string;
  items: QuotationItem[];
  createdAt: string;
  updatedAt: string;
}

export interface QuotationItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Purchase {
  id: string;
  purchaseNumber: string;
  date: string;
  supplierId: string;
  supplierName: string;
  status: "draft" | "ordered" | "received" | "cancelled";
  total: number;
  notes: string;
  items: PurchaseItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface StockMovement {
  id: string;
  movementNumber: string;
  date: string;
  type: "in" | "out" | "transfer";
  sourceStoreId?: string;
  sourceStoreName?: string;
  destinationStoreId?: string;
  destinationStoreName?: string;
  status: "draft" | "pending" | "completed" | "cancelled";
  notes: string;
  items: StockMovementItem[];
  createdAt: string;
  updatedAt: string;
}

export interface StockMovementItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  reason?: string;
}

export interface QuotationsResponse {
  success: boolean;
  message: string;
  data: {
    data: Quotation[];
    pagination: Pagination;
  };
}

export interface QuotationDetailResponse {
  success: boolean;
  message: string;
  data: Quotation;
}

export interface PurchasesResponse {
  success: boolean;
  message: string;
  data: {
    data: Purchase[];
    pagination: Pagination;
  };
}

export interface PurchaseDetailResponse {
  success: boolean;
  message: string;
  data: Purchase;
}

export interface StockMovementsResponse {
  success: boolean;
  message: string;
  data: {
    data: StockMovement[];
    pagination: Pagination;
  };
}

export interface StockMovementDetailResponse {
  success: boolean;
  message: string;
  data: StockMovement;
}

export interface CreateQuotationRequest {
  customerId: string;
  date: string;
  notes?: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface UpdateQuotationRequest extends CreateQuotationRequest {
  id: string;
  status?: "draft" | "sent" | "approved" | "rejected";
}

export interface CreatePurchaseRequest {
  supplierId: string;
  date: string;
  notes?: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitCost: number;
  }>;
}

export interface UpdatePurchaseRequest extends CreatePurchaseRequest {
  id: string;
  status?: "draft" | "ordered" | "received" | "cancelled";
}

export interface CreateStockMovementRequest {
  type: "in" | "out" | "transfer";
  date: string;
  sourceStoreId?: string;
  destinationStoreId?: string;
  notes?: string;
  items: Array<{
    productId: string;
    quantity: number;
    reason?: string;
  }>;
}

export interface UpdateStockMovementRequest extends CreateStockMovementRequest {
  id: string;
  status?: "draft" | "pending" | "completed" | "cancelled";
} 