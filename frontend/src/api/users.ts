import api from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  active: number;
}

export const getUsers = () => api.get<User[]>("/users");

export const updateUserRole = (id: number, role: string) =>
  api.put(`/users/${id}/role`, { role });

export const blockUser = (id: number) =>
  api.put(`/users/${id}/block`);
