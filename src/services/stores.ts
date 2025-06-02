import api from "./api";
import type {
  StoresResponse,
  StoreDetailResponse,
  CreateStoreRequest,
  UpdateStoreRequest,
} from "@/types/store.types";

interface GetStoresParams {
  search?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const storesService = {
  getAll: async (params: GetStoresParams = {}): Promise<StoresResponse> => {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append("search", params.search);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.page) queryParams.append("page", params.page.toString());

    const url = `/store/all${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await api.get<StoresResponse>(url);
    return response.data;
  },

  getDetail: async (id: number): Promise<StoreDetailResponse> => {
    const response = await api.post<StoreDetailResponse>("/store/detail", {
      id,
    });
    return response.data;
  },

  create: async (data: CreateStoreRequest): Promise<StoreDetailResponse> => {
    const response = await api.post<StoreDetailResponse>("/store/create", data);
    return response.data;
  },

  update: async (data: UpdateStoreRequest): Promise<StoreDetailResponse> => {
    const response = await api.post<StoreDetailResponse>("/store/update", data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.post("/store/delete", { id });
  },
};
