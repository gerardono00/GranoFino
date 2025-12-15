import { useCart } from "../context/CartContext";
import api from "../api/api";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom"; 
export default function Checkout() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.toString()) * item.quantity,
    0
  );


  const handleSuccessfulPayment = async (paymentMethod: string) => {
  };

  const onApprove = async (_data: any, actions: any) => {
    await actions.order?.capture();
    await handleSuccessfulPayment("paypal");
  };

  const payWithOxxo = async () => {
  };
    if (total === 0) {
      return (
        <div className="checkout-empty-container">
          <h2 className="checkout-title">🛍️ Carrito Vacío</h2>
          <p className="checkout-empty-message">No hay productos para pagar.</p>
          <Link to="/" className="btn-primary">
              Volver al Menú
          </Link>
        </div>
      );
  }

  return (
    <div className="checkout-page-container">
        
        <div className="checkout-card">
            <h2 className="checkout-title">🧾 Finalizar Compra</h2>
            
            {/* Resumen del Total */}
            <div className="checkout-total-summary">
                <span>Total a pagar</span>
                <h3 className="checkout-total-amount">${total.toFixed(2)} MXN</h3>
            </div>
            
            {/* Contenedor de Opciones de Pago */}
            <div className="payment-options-container">
                <p className="payment-instructions">Selecciona tu método de pago:</p>
                
                {/* Opción 1: PayPal */}
                <div className="paypal-button-wrapper">
                    <PayPalButtons
                        createOrder={(_data, actions) =>
                          actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "MXN", 
                                  value: total.toFixed(2),
                                },
                              },
                            ],
                          })
                        }
                        onApprove={onApprove}
                    />
                </div>

                {/* Separador */}
                <div className="payment-separator">O</div>

                {/* Opción 2: OXXO Pay */}
                <button 
                  onClick={payWithOxxo}
                  className="btn-oxxo-pay"
                >
                  Pagar con OXXO
                </button>

            </div>
            
            <p className="security-notice">
                Tus pagos son procesados de forma segura.
            </p>

        </div>
    </div>
  );
}