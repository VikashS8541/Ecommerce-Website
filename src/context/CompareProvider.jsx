import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    const stored = localStorage.getItem('compareList');
    return stored ? JSON.parse(stored) : [];
  });
  // Persist compareList to localStorage
  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  // Clear compareList on logout (listen for custom event)
  useEffect(() => {
    const clear = () => setCompareList([]);
    window.addEventListener('clearAllUserData', clear);
    return () => window.removeEventListener('clearAllUserData', clear);
  }, []);

  // Add item to compare
  const addToCompare = (item) => {
    setCompareList((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  // Remove item from compare
  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear compare list
  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export default CompareProvider;
