import { defineStore } from "pinia";
import { ref } from "vue";
import { accountsService } from "@/services/accounts";
import type {
  Account,
  Pagination,
  CreateAccountRequest,
  UpdateAccountRequest,
} from "@/types";

interface FetchAccountsOptions {
  search?: string;
  type?: "supplier" | "customer";
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: 1 | 10 | 100 | 1000;
  page?: number;
}

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);
  const pagination = ref<Pagination | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedAccount = ref<Account | null>(null);

  async function fetchAccounts(options: FetchAccountsOptions = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await accountsService.getAll(options);
      accounts.value = response.data.data;
      pagination.value = response.data.pagination;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch accounts";
    } finally {
      loading.value = false;
    }
  }

  async function fetchAccountDetail(id: number) {
    loading.value = true;
    error.value = null;

    try {
      const response = await accountsService.getDetail(id);
      selectedAccount.value = response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch account details";
    } finally {
      loading.value = false;
    }
  }

  async function createAccount(data: CreateAccountRequest) {
    loading.value = true;
    error.value = null;

    try {
      await accountsService.create(data);
      await fetchAccounts();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create account";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function updateAccount(data: UpdateAccountRequest) {
    loading.value = true;
    error.value = null;

    try {
      await accountsService.update(data);
      await fetchAccounts();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update account";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  async function deleteAccount(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await accountsService.delete(id);
      await fetchAccounts();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete account";
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  return {
    accounts,
    pagination,
    loading,
    error,
    selectedAccount,
    fetchAccounts,
    fetchAccountDetail,
    createAccount,
    updateAccount,
    deleteAccount,
  };
}); 