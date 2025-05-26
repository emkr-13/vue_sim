import api from "./api";
import type {
  ProductsResponse,
  ProductDetailResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types";

interface GetProductsParams {
  search?: string;
  categoryId?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export const productsService = {
  getAll: async (params: GetProductsParams = {}): Promise<ProductsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append("search", params.search);
    if (params.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.page) queryParams.append("page", params.page.toString());

    const url = `/products/all${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await api.get<ProductsResponse>(url);
    return response.data;
  },

  getDetail: async (id: string): Promise<ProductDetailResponse> => {
    const response = await api.post<ProductDetailResponse>("/products/detail", {
      id,
    });
    return response.data;
  },

  create: async (
    data: CreateProductRequest
  ): Promise<ProductDetailResponse> => {
    const response = await api.post<ProductDetailResponse>(
      "/products/create",
      data
    );
    return response.data;
  },

  update: async (
    data: UpdateProductRequest
  ): Promise<ProductDetailResponse> => {
    const response = await api.post<ProductDetailResponse>(
      "/products/update",
      data
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.post("/products/delete", { id });
  },
};
