import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import { productCategory, productData } from "../api/Api";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CompareIcon from "@mui/icons-material/Compare";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Wishlist from "../components/WishList";
import CompareItem from "../components/CompareItem";
import Login from "../layout/Login";
import SignUp from "../layout/SignUp";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import { useWishList } from "../context/WishListProvider";
import { useCompare } from "../context/CompareProvider";
import Cart from "../pages/Cart";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const { total, cartItems } = useCart();
  const { wishlist } = useWishList();
  const { compareList } = useCompare();
  const [openPopup, setOpenPopup] = useState(null);
  const [category, setCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [authDialogType, setAuthDialogType] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    { label: "home", to: "/" },
    { label: "about", to: "/about" },
    { label: "products", to: "/products" },
    { label: "contact", to: "/contact" },
  ];

  // Custom logout handler to clear all user data
  const handleLogout = () => {
    // Save current cart/wishlist/compare to localStorage for restore
    localStorage.setItem('cartItems_backup', localStorage.getItem('cartItems') || '[]');
    localStorage.setItem('wishlist_backup', localStorage.getItem('wishlist') || '[]');
    localStorage.setItem('compareList_backup', localStorage.getItem('compareList') || '[]');
    // Clear all user data
    window.dispatchEvent(new Event('clearAllUserData'));
    // Remove persisted data
    localStorage.removeItem('cartItems');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('compareList');
    logout();
  };

  // Restore data on login
  useEffect(() => {
    if (isLoggedIn) {
      const cartBackup = localStorage.getItem('cartItems_backup');
      const wishlistBackup = localStorage.getItem('wishlist_backup');
      const compareBackup = localStorage.getItem('compareList_backup');
      if (cartBackup) localStorage.setItem('cartItems', cartBackup);
      if (wishlistBackup) localStorage.setItem('wishlist', wishlistBackup);
      if (compareBackup) localStorage.setItem('compareList', compareBackup);
      // Remove backup after restore
      localStorage.removeItem('cartItems_backup');
      localStorage.removeItem('wishlist_backup');
      localStorage.removeItem('compareList_backup');
      // Do NOT reload the page here to avoid infinite reload
    }
  }, [isLoggedIn]);

  const services = isLoggedIn
    ? [
        { 
          label: "logout", 
          icon: <LogoutIcon />, 
          action: handleLogout 
        },
        { 
          label: "compare", 
          icon: <CompareIcon />, 
          isPopup: true 
        },
        { 
          label: "wishlist", 
          icon: <FavoriteBorderOutlinedIcon />, 
          isPopup: true 
        },
        { 
          label: `$${total.toFixed(2)}`,
          icon: <LocalMallOutlinedIcon />,
          isPopup: true,
          popupKey: "cart"
        },
      ]
    : [
        { 
          label: "login", 
          icon: <PersonOutlineOutlinedIcon />, 
          isPopup: true,
          dialogType: 'login'
        },
        { 
          label: "compare", 
          icon: <CompareIcon />, 
          isPopup: true 
        },
        { 
          label: "wishlist", 
          icon: <FavoriteBorderOutlinedIcon />, 
          isPopup: true 
        },
        { 
          label: `$${total.toFixed(2)}`,
          icon: <LocalMallOutlinedIcon />,
          isPopup: true,
          popupKey: "cart"
        },
      ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productCategory();
        setCategory(res);
        // Fetch all products for search suggestions
        const prodRes = await productData(194);
        setAllProducts(prodRes?.products || []);
      } catch (error) {
        console.log("Api does work", error);
      }
    };
    fetchData();
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (search.length > 0) {
      setSuggestions(
        allProducts.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 7)
      );
    } else {
      setSuggestions([]);
    }
  }, [search, allProducts]);

  const handleServiceClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.isPopup) {
      // For cart, open the cart popup
      if (item.popupKey === "cart" || item.label.includes("$")) {
        setOpenPopup("cart");
      } else if (item.label === "login") {
        setOpenPopup("login");
        setAuthDialogType("login"); // Always reset to login dialog
      } else {
        setOpenPopup(item.label);
      }
      if (item.dialogType && item.label !== "login") {
        setAuthDialogType(item.dialogType);
      }
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(null);
    setAuthDialogType('login'); // Reset to login by default
  };

  const switchToSignUp = () => {
    setAuthDialogType('signup');
    setOpenPopup('login'); // Ensure the dialog is open
  };

  const switchToLogin = () => {
    setAuthDialogType('login');
  };

  // Safe close handler that won't be undefined
  const safeCloseHandler = (handler) => {
    return typeof handler === 'function' ? handler : () => {};
  };

  return (
    <header className="relative z-[99] shadow-md py-2 lg:pb-6">
      <div className="container">
        <div className="navigation flex items-center justify-between lg:block">
          <div className="top-header flex-1 py-2 m-0 lg:mx-auto">
            <nav className="flex items-center justify-start">
              <div className="logo">
                <Link to="/" className="text-3xl font-semibold">
                  <img
                    className=" h-[50px] w-[50px] md:h-[80px] md:w-[80px]"
                    src={Logo}
                    alt={Logo}
                  />
                </Link>
              </div>
              <div className="filter rounded-lg  xs:min-w-[80px] mx-2 md:mx-auto md:min-w-[400px] mx-auto border py-2 px-4 heading-color lg:block relative">
                <form className="w-full flex items-center justify-between" autoComplete="off" onSubmit={e => e.preventDefault()}>
                  <SearchIcon className="heading-color pr-1" />
                  <input
                    className="outline-none border-none h-full w-full min-w-[80px] text-xm"
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </form>
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-[52px] bg-white border border-gray-200 rounded shadow-lg z-50 max-h-72 overflow-y-auto">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        className="px-4 py-2 cursor-pointer hover:bg-orange-100 text-sm"
                        onClick={() => {
                          navigate(`/products/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`);
                          setSearch("");
                          setSuggestions([]);
                        }}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="call-btn btn hidden lg:block transition-all 0.5 ease">
                <Link to="tel:+73-099321312" className="flex items-center">
                  <CallIcon className="dark-bg mr-2" />
                  <span>+73 099 321 312</span>
                </Link>
              </div>
            </nav>
          </div>

          <div className="bottom-header py-2 m-0 lg:mx-auto">
            <nav className="flex items-center justify-between w-full flex-wrap">
              {/* Desktop links */}
              <ul className="links items-center justify-start gap-10 hidden lg:flex">
                {menu.map((link, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `uppercase text-sm pb-2 px-2 text-color transition ${
                          isActive
                            ? "border-b-2 primary border-b-[#f47630]"
                            : "border-none"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Services icons (cart, wishlist, compare, etc.) always rendered once, toggle icon last for mobile/tablet */}
              <ul className="services-list flex items-center justify-start gap-4 lg:gap-10">
                {services.map((item, index) => {
                  let badge = null;
                  if (item.label === "wishlist" && wishlist.length > 0) {
                    badge = (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                        {wishlist.length}
                      </span>
                    );
                  }
                  if (item.label === "compare" && compareList && compareList.length > 0) {
                    badge = (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                        {compareList.length}
                      </span>
                    );
                  }
                  if ((item.label.includes("$") || item.popupKey === "cart") && cartItems && cartItems.length > 0) {
                    badge = (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                        {cartItems.length}
                      </span>
                    );
                  }
                  return (
                    <li
                      key={item.label}
                      className={`relative list-${index + 1} flex items-center justify-start gap-1 flex-wrap font-normal text-color transition cursor-pointer`}
                      onClick={() => handleServiceClick(item)}
                    >
                      <span className="uppercase text-sm relative">
                        {item.icon}
                        {badge}
                      </span>
                      <span className="uppercase text-sm hidden lg:block">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
                {/* Toggle icon at the end, only visible on mobile/tablet */}
                <li className="relative flex items-center lg:hidden">
                  <button
                    className="ml-2 text-3xl flex items-center justify-center"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>
                </li>
              </ul>
              {/* Mobile menu links */}
              <ul className={`links fixed top-[70px] left-0 w-full bg-white shadow-lg flex flex-col items-start gap-6 px-8 py-8 z-[999] transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`} style={{minHeight:'100vh'}}>
                {menu.map((link, idx) => (
                  <li key={idx} className="w-full">
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `uppercase text-lg block w-full py-2 px-2 text-color transition ${
                          isActive
                            ? "border-l-4 border-[#f47630] bg-orange-50"
                            : "border-none"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ul className="services-list hidden flex items-center justify-start gap-4 lg:gap-10">
                {services.map((item, index) => {
                  let badge = null;
                  if (item.label === "wishlist" && wishlist.length > 0) {
                    badge = (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                        {wishlist.length}
                      </span>
                    );
                  }
                  if (item.label === "compare" && compareList && compareList.length > 0) {
                    badge = (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                        {compareList.length}
                      </span>
                    );
                  }
                  if ((item.label.includes("$") || item.popupKey === "cart") && cartItems && cartItems.length > 0) {
                    badge = (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                        {cartItems.length}
                      </span>
                    );
                  }
                  return (
                    <li
                      key={item.label}
                      className={`relative list-${index + 1} flex items-center justify-start gap-1 flex-wrap font-normal text-color transition cursor-pointer`}
                      onClick={() => handleServiceClick(item)}
                    >
                      <span className="uppercase text-sm relative">
                        {item.icon}
                        {badge}
                      </span>
                      <span className="uppercase text-sm hidden lg:block">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <CompareItem
                isOpen={openPopup === "compare"}
                onClose={safeCloseHandler(handleClosePopup)}
              />


              <Wishlist
                isOpen={openPopup === "wishlist"}
                onClose={safeCloseHandler(handleClosePopup)}
                onSwitchToSignUp={switchToSignUp}
              />

              <Cart
                isOpen={openPopup === "cart"}
                onClose={safeCloseHandler(handleClosePopup)}
                onSwitchToSignUp={switchToSignUp}
              />

              {/* Show Login or SignUp dialog based on authDialogType */}
              {openPopup === 'login' && authDialogType === 'login' && (
                <Login
                  isOpen={true}
                  onClose={safeCloseHandler(handleClosePopup)}
                  onSwitchToSignUp={switchToSignUp}
                />
              )}
              {openPopup === 'login' && authDialogType === 'signup' && (
                <SignUp
                  isOpen={true}
                  onClose={safeCloseHandler(handleClosePopup)}
                  onSwitchToLogin={switchToLogin}
                />
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;