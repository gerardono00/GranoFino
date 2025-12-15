import api from "./api";

export interface DashboardStats {
  users: number;
  products: number;
  orders: number;
  revenue: number;
}

export const getDashboardStats = () =>
  api.get<DashboardStats>("/dashboard");
