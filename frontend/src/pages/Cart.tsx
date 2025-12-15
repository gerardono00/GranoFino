import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; 
import { Trash2 } from "lucide-react"; 

export default function Cart() {
  const { cart, addToCart, decrementFromCart, removeItemCompletely, clearCart } = useCart(); 

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <h2 className="cart-title">🛒 Tu Carrito Está Vacío</h2>
        <p className="cart-empty-message">Añade algunos de nuestros deliciosos cafés para empezar.</p>
        <Link to="/" className="btn-primary">
            Explorar Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito de Compras</h2>
      
      <div className="cart-content-wrapper">
        
        {/* Columna de Ítems */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              
              {/* Información del Producto */}
              <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <span className="cart-item-unit-price">
                    ${item.price.toFixed(2)} c/u
                  </span>
              </div>
              
              {/* Cantidad y Acciones */}
              <div className="cart-item-actions-group">
                
                {/* Control de Cantidad */}
                <div className="quantity-control">
                  <button onClick={() => decrementFromCart(item.id)} className="btn-quantity-remove">
                    - 
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  {/* Usar addToCart para el botón '+' */}
                  <button onClick={() => addToCart(item)} className="btn-quantity-add">
                    +
                  </button>
                </div>

                <span className="cart-item-price-total">${(item.price * item.quantity).toFixed(2)}</span>
                
                {/* Botón de Eliminar Ítem Completo */}
                <button 
                  onClick={() => removeItemCompletely(item.id)}
                  className="btn-item-delete"
                  aria-label={`Eliminar ${item.name}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
            </div>
          ))}
          
          <button onClick={clearCart} className="btn-clear-cart-bottom">
            Vaciar Carrito
          </button>
        </div>

        {/* Columna de Resumen (Sidebar) */}
        <div className="cart-summary-card">
          <h3 className="summary-title">Resumen del Pedido</h3>
          <div className="summary-detail">
            <span>Subtotal ({cart.length} productos)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-total">
            <span>Total Estimado</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn-checkout">
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  );
}