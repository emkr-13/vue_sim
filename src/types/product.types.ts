import { Pagination } from './common.types';

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

export interface titleForProducts {
  title: string;
} 