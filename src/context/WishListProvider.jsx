
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishListContext = createContext();

export const useWishList = () => useContext(WishListContext);

const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });
  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Clear wishlist on logout (listen for custom event)
  useEffect(() => {
    const clear = () => setWishlist([]);
    window.addEventListener('clearAllUserData', clear);
    return () => window.removeEventListener('clearAllUserData', clear);
  }, []);

  // Add item to wishlist
  const addToWishlist = (item) => {
    setWishlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  // Move item to cart (requires addToCart from cart context)
  const moveToCart = (item, addToCart) => {
    removeFromWishlist(item.id);
    if (addToCart) addToCart(item);
  };

  return (
    <WishListContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, moveToCart }}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;
