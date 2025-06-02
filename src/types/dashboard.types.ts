export interface DashboardGeneralSummary {
  total_customers: string;
  total_suppliers: string;
  total_stores: string;
  total_products: string;
}

export interface DashboardSpecificSummary {
  total_quotations: string;
  total_purchases: string;
  total_stock_movements_in: string;
  total_stock_movements_out: string;
  time_filter: string;
}

export interface DashboardGeneralResponse {
  success: boolean;
  message: string;
  data: DashboardGeneralSummary;
}

export interface DashboardSpecificResponse {
  success: boolean;
  message: string;
  data: DashboardSpecificSummary;
} 