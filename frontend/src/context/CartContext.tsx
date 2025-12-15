import { createContext, useContext, useState } from "react";
import api from "../api/api"; 

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  decrementFromCart: (id: number) => void; 
  removeItemCompletely: (id: number) => void; 
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {   
    const normalizedPrice = parseFloat(product.price.toString());
    const priceToAdd = isNaN(normalizedPrice) ? 0 : normalizedPrice;


    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, price: priceToAdd, quantity: 1 }];
    });
  };

  const decrementFromCart = (id: number) => {
    setCart((prev) => {
      const existingItem = prev.find((p) => p.id === id);
      
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
      
      return prev.filter((p) => p.id !== id);
    });
  };

  const removeItemCompletely = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };
  
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        decrementFromCart,
        removeItemCompletely, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};