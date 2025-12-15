import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve con BrowserRouter para que todas las rutas funcionen */}
        <PayPalScriptProvider
            options={{
                clientId:
                "AWMhrg298qgK927RQspl4E7GqJWUMooqswLmkb-o0VmrQMEnoJ5okBGqMChHb2PbHK5V5frc1IvspPmV",                
                currency: "MXN", 
            }}
        >
            <CartProvider>
                <App />
            </CartProvider>
        </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);