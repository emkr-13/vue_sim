import { defineStore } from "pinia";
import { ref } from "vue";
import { dashboardService } from "@/services/dashboard";
import type {
  DashboardGeneralSummary,
  DashboardSpecificSummary,
} from "@/types";

// Import TimeFilter type from dashboard service
type TimeFilter =
  | "today"
  | "this_week"
  | "last_week"
  | "last_two_weeks"
  | "this_month";

export const useDashboardStore = defineStore("dashboard", () => {
  const generalData = ref<DashboardGeneralSummary | null>(null);
  const specificData = ref<DashboardSpecificSummary | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchGeneralSummary = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await dashboardService.getGeneralSummary();
      generalData.value = response.data;
    } catch (err) {
      console.error("Error fetching general summary:", err);
      error.value = "Failed to fetch dashboard general data";
      // Fallback data for development
      generalData.value = {
        total_customers: "20",
        total_suppliers: "30",
        total_stores: "15",
        total_products: "50",
      };
    } finally {
      loading.value = false;
    }
  };

  const fetchSpecificSummary = async (
    timeFilter: TimeFilter = "this_month"
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await dashboardService.getSpecificSummary(timeFilter);
      specificData.value = response.data;
    } catch (err) {
      console.error("Error fetching specific summary:", err);
      error.value = "Failed to fetch dashboard specific data";
      // Fallback data for development
      specificData.value = {
        total_quotations: "40",
        total_purchases: "50",
        total_stock_movements_in: "112",
        total_stock_movements_out: "20",
        time_filter: timeFilter,
      };
    } finally {
      loading.value = false;
    }
  };

  return {
    generalData,
    specificData,
    loading,
    error,
    fetchGeneralSummary,
    fetchSpecificSummary,
  };
});
