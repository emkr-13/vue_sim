import { Pagination } from "./common.types";

export interface Purchase {
  id: number;
  quotationNumber: string;
  quotationDate: string;
  customerId: number;
  customerName: string;
  storeId: number;
  storeName: string;
  status: string;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseItem {
  id: null;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  satuan: string;
  discount: number;
  subtotal: number;
  description: string;
  notes: string;
}

export interface DetailPurchases {
  id: number;
  quotationNumber: string;
  quotationDate: string;
  customerId: number;
  customerName: string;
  storeId: number;
  storeName: string;
  status: string;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  details: PurchaseItem[];
}

export interface DetailPurchasesResponse {
  success: boolean;
  message: string;
  data: DetailPurchases;
}

export interface ListPurchasesResponse {
  success: boolean;
  message: string;
  data: {
    data: Purchase[];
    pagination: Pagination;
  };
}
