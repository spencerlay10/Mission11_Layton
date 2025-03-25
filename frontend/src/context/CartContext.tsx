import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      
      if (existingItem) {
        // If the item is already in the cart, increment the quantity
        return prevCart.map((c) =>
          c.bookID === item.bookID
            ? { ...c, quantity: c.quantity + 1 }  // Increment quantity
            : c
        );
      } else {
        // If the item is new, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((c) => c.bookID === bookID);
      
      if (itemToRemove && itemToRemove.quantity > 1) {
        // Decrease the quantity if greater than 1
        return prevCart.map((c) =>
          c.bookID === bookID
            ? { ...c, quantity: c.quantity - 1 }
            : c
        );
      } else {
        // Remove the item entirely if quantity is 1
        return prevCart.filter((c) => c.bookID !== bookID);
      }
    });
  };
  

  const clearCart = () => {
    setCart(() => []);
  };

  // Puts all of the cart information in a cart context provider to save the data
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
