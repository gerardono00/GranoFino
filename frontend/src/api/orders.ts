import api from "./api";

export interface Order {
  id: number;
  name: string;
  email: string;
  total: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders");
  return res.data;
};
