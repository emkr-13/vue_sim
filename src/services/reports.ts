import api from './api';
import type {
  ReportFilter,
  SalesReportResponse,
  PurchaseReportResponse,
  InventoryReportResponse
} from '@/types/report.types';

export const getSalesReport = async (filter: ReportFilter, page = 1, limit = 10): Promise<SalesReportResponse> => {
  const response = await api.get('/reports/sales', {
    params: {
      ...filter,
      page,
      limit
    }
  });
  return response.data;
};

export const getPurchaseReport = async (filter: ReportFilter, page = 1, limit = 10): Promise<PurchaseReportResponse> => {
  const response = await api.get('/reports/purchases', {
    params: {
      ...filter,
      page,
      limit
    }
  });
  return response.data;
};

export const getInventoryReport = async (filter: ReportFilter, page = 1, limit = 10): Promise<InventoryReportResponse> => {
  const response = await api.get('/reports/inventory', {
    params: {
      ...filter,
      page,
      limit
    }
  });
  return response.data;
};

export const exportSalesReport = async (filter: ReportFilter, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> => {
  const response = await api.get('/reports/sales/export', {
    params: {
      ...filter,
      format
    },
    responseType: 'blob'
  });
  return response.data;
};

export const exportPurchaseReport = async (filter: ReportFilter, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> => {
  const response = await api.get('/reports/purchases/export', {
    params: {
      ...filter,
      format
    },
    responseType: 'blob'
  });
  return response.data;
};

export const exportInventoryReport = async (filter: ReportFilter, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> => {
  const response = await api.get('/reports/inventory/export', {
    params: {
      ...filter,
      format
    },
    responseType: 'blob'
  });
  return response.data;
}; 