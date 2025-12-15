import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, LogIn, UserPlus, LayoutDashboard } from "lucide-react"; 

export default function Navbar() {
  const { cart } = useCart();
  
  const userRole = localStorage.getItem('role');
  const userToken = localStorage.getItem('token');

  const isAdmin = userRole && userRole.toLowerCase().trim() === 'admin';
  const isAuthenticated = !!userToken;
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload(); 
  };


  return (
    <header className="navbar-header"> 
      <nav className="navbar-nav">

        {/* IZQUIERDA – CARRITO Y ADMIN BUTTON */}
        <div className="navbar-left">
          
          {/* BOTÓN DE ADMINISTRADOR (CONDICIONAL) */}
          {isAdmin && (
            <Link
              to="/admin" // USAMOS LA RUTA CORRECTA DE TU DASHBOARD
              aria-label="Ir al Panel de Administración"
              className="btn-admin-dashboard"
            >
              <LayoutDashboard size={20} />
            </Link>
          )}

          {/* ESPACIADOR entre Admin y Carrito (si es admin) */}
          {isAdmin && <div className="admin-cart-spacer"></div>}

          {/* CARRITO */}
          <Link
            to="/cart"
            aria-label="Ver carrito de compras"
            className="navbar-cart-link"
          >
            <ShoppingCart size={24} />

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* CENTRO – LOGO DE MARCA Y TEXTO INICIO */}
        <div className="navbar-center">
            {/* Logo de Marca */}
            <Link to="/" className="navbar-logo">
                ☕ GranoFino
            </Link>
            
            {/* INICIO (Texto) */}
             <Link
                to="/"
                className="navbar-link-home"
            >
                Inicio
            </Link>
        </div>


        {/* DERECHA – LOGIN / REGISTRO / LOGOUT */}
        <div className="navbar-right">
          
          {/* RENDERIZADO CONDICIONAL DE BOTONES */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn-logout"
            >
              Logout
            </button>
          ) : (
            <>
              {/* BOTÓN LOGIN */}
              <Link
                to="/login"
                className="btn-login"
              >
                <LogIn size={18} />
                Login
              </Link>

              {/* BOTÓN REGISTRARSE */}
              <Link
                to="/register"
                className="btn-register"
              >
                <UserPlus size={16} />
                Registrarse
              </Link>
            </>
          )}

        </div>

      </nav>
    </header>
  );
}