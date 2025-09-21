import React from "react";
import CartProvider from "./CartProvider";
import WishListProvider from "./WishListProvider";
import CompareProvider from "./CompareProvider";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }) => {
  return (
    <CartProvider>
      <WishListProvider>
        <CompareProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
          />
        </CompareProvider>
      </WishListProvider>
    </CartProvider>
  );
};

export default Providers;
