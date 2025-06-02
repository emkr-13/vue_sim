import api from "./api";
import type {
  DashboardGeneralResponse,
  DashboardSpecificResponse,
} from "@/types/dashboard.types";

type TimeFilter =
  | "today"
  | "this_week"
  | "last_week"
  | "last_two_weeks"
  | "this_month";

export const dashboardService = {
  getGeneralSummary: async (): Promise<DashboardGeneralResponse> => {
    const response = await api.get<DashboardGeneralResponse>(
      "/dashboard/summary-general"
    );
    return response.data;
  },

  getSpecificSummary: async (
    timeFilter: TimeFilter = "this_month"
  ): Promise<DashboardSpecificResponse> => {
    const response = await api.get<DashboardSpecificResponse>(
      `/dashboard/summary-specific?time_filter=${timeFilter}`
    );
    return response.data;
  },
};
