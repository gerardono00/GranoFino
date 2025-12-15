import { Link } from "react-router-dom";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">☕ El Grano Fino</h2>

        <nav className="admin-sidebar-nav">
          <Link to="/admin" className="admin-sidebar-link">
            📊 Dashboard
          </Link>
          <Link to="/admin/products" className="admin-sidebar-link">
            🛒 Productos
          </Link>
          <Link to="/admin/orders" className="admin-sidebar-link">
            📦 Órdenes
          </Link>
          <Link to="/admin/users" className="admin-sidebar-link">
            👤 Usuarios
          </Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}