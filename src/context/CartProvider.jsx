
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  // Simple cart state: array of items {id, title, price, qty}
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });
  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Clear cart on logout (listen for custom event)
  useEffect(() => {
    const clear = () => setCartItems([]);
    window.addEventListener('clearAllUserData', clear);
    return () => window.removeEventListener('clearAllUserData', clear);
  }, []);

  // Calculate total
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
        );
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Update item quantity
  const updateQty = (id, qty) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
