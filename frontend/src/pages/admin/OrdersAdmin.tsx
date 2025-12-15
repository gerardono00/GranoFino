import { useEffect, useState } from "react";
import { getOrders, type Order } from "../../api/orders";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📦 Órdenes</h1>

      {orders.length === 0 ? (
        <p>No hay órdenes aún</p>
      ) : (
        <table border={1} cellPadding={8} width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Total</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>${order.total}</td>
                <td>{order.payment_method}</td>
                <td>{order.payment_status}</td>
                <td>
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
