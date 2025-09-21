import React from "react";
import Layout from "../layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import Checkout from "../pages/Checkout";
import Login from "../layout/Login";
import SignUp from "../layout/SignUp";
import AuthProvider from "../context/AuthProvider";
import SingleProductPage from "../pages/SingleProductPage";
import ShippingPolicy from "../pages/ShippingPolicy";
import ReturnsExchanges from "../pages/ReturnsExchanges";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";

const AppRouting = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:title" element={<SingleProductPage />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRouting;
