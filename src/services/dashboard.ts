import api from "./api";
import type {
  DashboardGeneralResponse,
  DashboardSpecificResponse,
} from "@/types";

type TimeFilter =
  | "today"
  | "yesterday"
  | "last_week"
  | "last_two_weeks"
  | "last_month"
  | "last_year";

export const dashboardService = {
  getGeneralSummary: async (): Promise<DashboardGeneralResponse> => {
    const response = await api.get<DashboardGeneralResponse>(
      "/dashboard/summary-general"
    );
    return response.data;
  },

  getSpecificSummary: async (
    timeFilter: TimeFilter = "last_two_weeks"
  ): Promise<DashboardSpecificResponse> => {
    const response = await api.get<DashboardSpecificResponse>(
      `/dashboard/summary-specific?time_filter=${timeFilter}`
    );
    return response.data;
  },
};
