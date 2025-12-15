import { useEffect, useState } from "react";
// Asegúrate de que la ruta de la API sea correcta
import { getDashboardStats, type DashboardStats } from "../../api/dashboard"; 

// Componente de Tarjeta adaptado a CSS Vainilla
function Card({ title, value }: { title: string; value: any }) {
  // 🚨 Adaptación de clases Tailwind a CSS Vainilla: .stat-card, .stat-value
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // 🚨 Adaptación de clases Tailwind a CSS Vainilla
    return (
      <div className="dashboard-content">
        <p className="loading-message">Cargando dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    // 🚨 Adaptación de clases Tailwind a CSS Vainilla
    return (
      <div className="dashboard-content">
        <p className="error-message">Error al cargar métricas</p>
      </div>
    );
  }

  return (
    // 🚨 Adaptación de clases Tailwind a CSS Vainilla
    <div className="dashboard-content">
      <h1 className="dashboard-header-title">
        📊 Resumen del Dashboard
      </h1>

      {/* 🚨 Adaptación de clases: usando .stats-grid */}
      <div className="stats-grid">
        <Card title="Usuarios" value={stats.users} />
        <Card title="Productos" value={stats.products} />
        <Card title="Órdenes" value={stats.orders} />
        {/* Aseguramos el formato de moneda aquí */}
        <Card title="Ingresos" value={`$${parseFloat(stats.revenue.toString()).toFixed(2)}`} />
      </div>

      {/* Podemos añadir de nuevo la sección de órdenes recientes del layout anterior */}
      <section className="recent-orders-section">
        <h2>Órdenes Recientes (Simulación)</h2>
        <div className="table-placeholder">
            <p>Tabla de últimas 5 órdenes (en desarrollo)...</p>
        </div>
      </section>

    </div>
  );
}