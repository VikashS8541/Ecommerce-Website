import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Pinterest } from "@mui/icons-material";
import { productCategory } from "../api/Api";

const Footer = () => {
  // Dynamic categories for Shop section
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const catData = await productCategory();
      if (Array.isArray(catData)) setCategories(catData);
      else if (Array.isArray(catData?.categories)) setCategories(catData.categories);
      else setCategories([]);
    };
    fetchCategories();
  }, []);

  // Fix: Use category slug for the URL parameter to match API structure
  const mainCategories = Array.isArray(categories) && categories.length > 0
    ? categories.slice(0, 7).map(cat => {
        // Extract both name and slug from the category object
        const categoryName = typeof cat === 'object' && cat !== null ? cat.name : String(cat);
        const categorySlug = typeof cat === 'object' && cat !== null ? cat.slug : String(cat).toLowerCase().replace(/\s+/g, '-');
        
        // Use the category slug for the URL to match API structure
        return { 
          label: categoryName, 
          to: `/products?category=${encodeURIComponent(categorySlug)}` 
        };
      })
    : [];

  const footerLinks = [
    {
      title: "Shop",
      links: mainCategories
    },
    {
      title: "Company",
      links: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Products", to: "/products" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Shipping Policy", to: "/shipping-policy" },
        { label: "Returns & Exchanges", to: "/returns-exchanges" },
        { label: "Terms of Use", to: "/terms-of-use" },
        { label: "Privacy Policy", to: "/privacy-policy" },
      ]
    },
  ];

  return (
    <footer className="bg-gray-50 py-10 mt-10">
      <div className="container">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="footer-items">
              <h3 className="heading-color text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="text-color">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 mt-1">
            Copyright © {new Date().getFullYear()} - Ecommerce Basic Website
          </p>
          {/* Social icons */}
          <div className="flex space-x-4 mt-4 md:mt-0 text-color">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-color"><Facebook fontSize="medium" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-color"><Twitter fontSize="medium" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-color"><Instagram fontSize="medium" /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-color"><Pinterest fontSize="medium" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;