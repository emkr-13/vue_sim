import api from "./api";
import type {
  AccountsResponse,
  AccountDetailResponse,
  CreateAccountRequest,
  UpdateAccountRequest,
} from "@/types";

interface GetAccountsParams {
  search?: string;
  type?: "supplier" | "customer";
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export const accountsService = {
  getAll: async (params: GetAccountsParams = {}): Promise<AccountsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append("search", params.search);
    if (params.type) queryParams.append("type", params.type);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.page) queryParams.append("page", params.page.toString());

    const url = `/akun/all${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await api.get<AccountsResponse>(url);
    return response.data;
  },

  getDetail: async (id: number): Promise<AccountDetailResponse> => {
    const response = await api.post<AccountDetailResponse>("/akun/detail", {
      id,
    });
    return response.data;
  },

  create: async (
    data: CreateAccountRequest
  ): Promise<AccountDetailResponse> => {
    const response = await api.post<AccountDetailResponse>(
      "/akun/create",
      data
    );
    return response.data;
  },

  update: async (
    data: UpdateAccountRequest
  ): Promise<AccountDetailResponse> => {
    const response = await api.post<AccountDetailResponse>(
      "/akun/update",
      data
    );
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.post("/akun/delete", { id });
  },
};
