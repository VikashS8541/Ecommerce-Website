import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useWishList } from "../context/WishListProvider";
import { useCompare } from "../context/CompareProvider";
import { Link, useParams, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareIcon from "@mui/icons-material/Compare";
import StraightenIcon from "@mui/icons-material/Straighten";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Loader from "../components/Loader";
import { productData } from "../api/Api";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishList();
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  // Toggle handlers for wishlist and compare
  const handleWishList = (item) => {
    if (wishlist.some((p) => p.id === item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const handleCompare = (item) => {
    if (compareList.some((p) => p.id === item.id)) {
      removeFromCompare(item.id);
    } else {
      addToCompare(item);
    }
  };
  const [feedback, setFeedback] = useState("");
  // Global notification for related products
  const [notification, setNotification] = useState("");
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 1500);
  };
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  // Helper to create slug from title (must match Products.jsx)
  const createSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productData(194);
        const found = data.products.find((p) => createSlug(p.title) === title);
        if (found) {
          setProduct(found);
          // Find related products (same category, not current)
          const relatedProducts = data.products
            .filter((p) => p.category === found.category && p.id !== found.id)
            .slice(0, 8);
          setRelated(relatedProducts);
        } else {
          setProduct(null);
          setRelated([]);
        }
      } catch (error) {
        setProduct(null);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [title]);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) return <Loader />;
  if (!product)
    return (
      <div className="text-center py-20">
        <div className="text-2xl font-semibold mb-4 text-red-500">
          Product not found
        </div>
        <div className="mb-4">
          Sorry, we couldn't find the product you are looking for.
        </div>
        <Link
          to="/products"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          Back to Products
        </Link>
      </div>
    );

  return (
    <>
      <section className="single-page-section">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image with Zoom (Gallery if available) */}
            <div className="single-image w-full flex flex-col items-center">
              <Zoom>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : product.thumbnail
                  }
                  alt={product.title}
                  loading="lazy"
                  style={{
                    width: 500,
                    height: 500,
                    objectFit: "contain",
                    background: "#fff",
                  }}
                  className="rounded-lg shadow-md"
                />
              </Zoom>
            </div>

            {/* Product Info */}
            <div className="product-details">
              {/* Breadcrumb */}
              <div className="flex gap-2 flex-wrap text-sm  mb-6">
                <Link
                  to="/"
                  className={`hover:text-black ${
                    location.pathname === "/" ? "para" : " text-orange-500"
                  }`}
                >
                  Home
                </Link>
                <span>
                  <KeyboardArrowRightIcon fontSize="small" />
                </span>
                <Link
                  to="/products"
                  className={`hover:text-black ${
                    location.pathname === "/products"
                      ? "para"
                      : "text-orange-500"
                  }`}
                >
                  Products
                </Link>
                <span>
                  <KeyboardArrowRightIcon fontSize="small" />
                </span>
                {/* Category breadcrumb */}
                <Link
                  to={`/products?category=${encodeURIComponent(
                    product.category
                  )}`}
                  className="hover:text-black text-orange-500 capitalize"
                >
                  {product.category}
                </Link>
                <span>
                  <KeyboardArrowRightIcon fontSize="small" />
                </span>
                <span className="para">{product.title}</span>
              </div>

              <h2 className="text-3xl font-bold heading-color mb-3">
                {product.title}
              </h2>
              <p className="text-xl font-semibold heading-color my-4">
                Price:{" "}
                <span className="para text-lg ml-1">${product.price}</span>
              </p>

              <p className="para my-6">{product.description}</p>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded my-6">
                  <button
                    onClick={decrement}
                    className="px-3 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={increment}
                    className="px-3 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    addToCart({ ...product, qty: quantity });
                    setFeedback("Added to cart!");
                    setTimeout(() => setFeedback(""), 1200);
                  }}
                >
                  Add to cart
                </button>
                {feedback && (
                  <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded shadow text-xs">
                    {feedback}
                  </div>
                )}
              </div>

              {/* Wishlist / Compare / Size Guide */}
              <div className="flex  flex-wrap items-center gap-3 lg:gap-6 text-gray-600 mb-6">
                <button
                  className={`flex items-center gap-2 transition-colors rounded-full px-2 py-1 ${wishlist.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
                  onClick={() => handleWishList(product)}
                >
                  <FavoriteBorderIcon fontSize="small" /> Wishlist
                </button>
                <button
                  className={`flex items-center gap-2 transition-colors rounded-full px-2 py-1 ${compareList.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
                  onClick={() => handleCompare(product)}
                >
                  <CompareIcon fontSize="small" /> Compare
                </button>
                <button className="flex items-center gap-2 hover:text-black transition-colors">
                  <StraightenIcon fontSize="small" /> Size Guide
                </button>
              </div>

              {/* Category */}
              <p className="text-sm heading-color uppercase mb-4">
                <span className="font-semibold ">CATEGORY:</span>{" "}
                <span className="para">{product.category}</span>
              </p>

              {/* Share */}
              <p className="text-sm font-semibold mb-4">Share your love</p>
              <div className="flex gap-4 text-gray-600 mb-8">
                <FacebookIcon className="cursor-pointer hover:text-blue-600 transition-colors" />
                <TwitterIcon className="cursor-pointer hover:text-blue-400 transition-colors" />
                <InstagramIcon className="cursor-pointer hover:text-pink-600 transition-colors" />
                <PinterestIcon className="cursor-pointer hover:text-red-600 transition-colors" />
              </div>

              {/* Safe Checkout */}
              <div className="mt-8 border-t pt-6">
                <p className="text-sm font-semibold mb-4">
                  Guaranteed Safe Checkout
                </p>
                <div className="flex gap-3">
                  <span class="ct-icon-container">
                    <svg
                      class="ct-icon"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                    >
                      <path
                        fill="var(--theme-icon-color, #F2F0EB)"
                        d="M2.92,5.83h29.17c1.61,0,2.92,1.31,2.92,2.92v17.5c0,1.61-1.31,2.92-2.92,2.92H2.92C1.31,29.17,0,27.86,0,26.25V8.75C0,7.14,1.31,5.83,2.92,5.83z"
                      ></path>
                      <path
                        fill="var(--theme-icon-color-2, #E82128)"
                        d="M15.18,17.5c-0.01-1.89,0.85-3.68,2.33-4.85c-2.54-1.99-6.17-1.7-8.36,0.66s-2.19,6.02,0,8.39s5.83,2.65,8.36,0.66C16.02,21.18,15.17,19.39,15.18,17.5z"
                      ></path>
                      <path
                        fill="var(--theme-icon-color-2, #F49D20)"
                        d="M27.5,17.5c0,2.36-1.35,4.52-3.48,5.55c-2.13,1.04-4.66,0.76-6.52-0.7c2.68-2.11,3.14-5.99,1.04-8.67c0,0,0,0,0,0c-0.3-0.39-0.65-0.74-1.04-1.05c1.86-1.46,4.39-1.73,6.52-0.7S27.5,15.13,27.5,17.5z"
                      ></path>
                      <path
                        fill="var(--theme-icon-color-2, #F16223)"
                        d="M18.54,13.68c-0.3-0.39-0.65-0.74-1.04-1.05c-1.48,1.17-2.34,2.96-2.33,4.85c-0.01,1.89,0.85,3.68,2.33,4.85C20.18,20.24,20.65,16.36,18.54,13.68z"
                        stroke="var(--theme-icon-color, transparent)"
                        stroke-width="1.5"
                      ></path>
                    </svg>
                  </span>
                  <span class="ct-icon-container">
                    <svg
                      class="ct-icon"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                    >
                      <path
                        fill="var(--theme-icon-color, #2A2C6B)"
                        d="M2.92 5.83h29.17c1.61 0 2.92 1.31 2.92 2.92v17.5c0 1.61-1.31 2.92-2.92 2.92H2.92C1.31 29.17 0 27.86 0 26.25V8.75c0-1.61 1.31-2.92 2.92-2.92z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="m17.4 14.14-1.46 6.74h-1.75l1.46-6.74h1.75zm7.33 4.37.92-2.53.53 2.53h-1.45zm1.95 2.4h1.62l-1.41-6.74h-1.46c-.32 0-.61.2-.73.5l-2.62 6.25h1.84l.36-1.01h2.19l.21 1zm-4.55-2.19c.01-1.82-2.44-1.95-2.44-2.68 0-.24.23-.5.73-.56.59-.06 1.18.04 1.72.3l.31-1.46c-.52-.2-1.08-.3-1.63-.3-1.72 0-2.92.92-2.92 2.23 0 .97.87 1.51 1.52 1.83.66.32.91.55.9.84 0 .45-.54.66-1.04.66-.62.01-1.23-.14-1.78-.44l-.31 1.46c.62.24 1.28.36 1.94.36 1.83 0 3.03-.9 3.04-2.3m-7.23-4.54-2.83 6.74h-1.9l-1.39-5.39a.707.707 0 0 0-.42-.59 7.55 7.55 0 0 0-1.72-.57l.04-.2h2.97c.4 0 .74.29.81.69l.73 3.9 1.82-4.59h1.89z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ct-icon-container">
                    <svg
                      class="ct-icon"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                    >
                      <path
                        fill="var(--theme-icon-color, #1F72CD)"
                        d="M2.92 5.83h29.17c1.61 0 2.92 1.31 2.92 2.92v17.5c0 1.61-1.31 2.92-2.92 2.92H2.92C1.31 29.17 0 27.86 0 26.25V8.75c0-1.61 1.31-2.92 2.92-2.92z"
                      ></path>
                      <path
                        fill="#FFF"
                        fill-rule="evenodd"
                        d="m6.5 13.9-3.2 7.2h3.8l.5-1.2h1.1l.5 1.2h4.2v-.9l.4.9H16l.4-.9v.9h8.7l1.1-1.1 1 1.1h4.5l-3.2-3.6 3.2-3.6h-4.4l-1 1.1-1-1.1h-9.5l-1 1.9-.8-1.9h-3.8v.9l-.5-.9H6.5zm13 1h5l1.5 1.7 1.6-1.7h1.5l-2.3 2.6 2.3 2.6h-1.6L26 18.4l-1.6 1.7h-4.9v-5.2zm1.2 2.1v-.9h3.1l1.4 1.5-1.4 1.4h-3.1v-1h2.7v-1.1h-2.7v.1zM7.2 14.9h1.9l2.1 4.9v-4.9h2l1.6 3.5 1.5-3.5h2v5.2h-1.2V16l-1.8 4.1h-1.1L12.4 16v4.1H9.9l-.5-1.2H6.8l-.5 1.2H5l2.2-5.2zm.1 3 .9-2.1.8 2.1H7.3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span class="ct-icon-container">
                    <svg
                      class="ct-icon"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                    >
                      <path
                        fill="var(--theme-icon-color, #4D4D4D)"
                        d="M35 8.75v17.5c0 1.61-1.31 2.92-2.92 2.92H2.92c-.34 0-.67-.06-.99-.18A2.912 2.912 0 0 1 0 26.25V8.75c0-1.61 1.31-2.92 2.92-2.92h29.17c1.6 0 2.91 1.31 2.91 2.92z"
                      ></path>
                      <path
                        fill="var(--theme-icon-color-2, #FD6020)"
                        d="M35 17.5v8.72c0 1.63-1.3 2.94-2.91 2.94H2.99c-.34.01-.67-.04-.99-.16 2.44-.35 4.8-.8 7.12-1.3.61-.12 1.21-.26 1.8-.4 9.62-2.22 17.94-5.49 22.63-8.69.52-.37 1.01-.74 1.45-1.11zm-14.15-1.58c0-1.37-1.11-2.48-2.49-2.49a2.49 2.49 0 1 0 2.49 2.49z"
                      ></path>
                      <path
                        fill="var(--theme-icon-color, #FD6020)"
                        d="m11.19 28.76-.55.12c-.42.1-.86.2-1.3.28h-.15 22.9c1.61 0 2.92-1.31 2.92-2.92v-6.78c-.19.15-.41.29-.63.45-4.97 3.35-13.63 6.66-23.19 8.85z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M4.24 13.56v.03H2.92v4.64h1.33c.6.03 1.2-.15 1.68-.52.78-.65 1.05-1.74.67-2.68a2.374 2.374 0 0 0-2.36-1.47zm1.08 3.53c-.35.3-.8.45-1.25.41h-.23v-3.12h.23c.45-.05.9.09 1.25.38.33.3.52.72.51 1.17.01.44-.18.86-.51 1.16zm1.86-3.51h.91v4.68h-.91v-4.68zm4.49 3.26c.01.42-.16.83-.46 1.12-.31.29-.72.44-1.14.41-.68.04-1.32-.31-1.66-.89l.59-.57c.18.39.57.63.99.63.19.02.37-.05.51-.17s.22-.3.22-.49c0-.2-.11-.38-.28-.48-.2-.11-.42-.2-.63-.27-.85-.31-1.14-.63-1.14-1.28.01-.37.17-.73.44-.98.28-.25.64-.38 1.02-.36.51 0 1 .18 1.37.52l-.47.62a.948.948 0 0 0-.73-.38c-.39 0-.68.26-.68.52s.18.39.73.59c1.02.38 1.32.72 1.32 1.46zm2.79-3.37c.39 0 .78.1 1.12.29v1.07c-.29-.33-.71-.52-1.14-.52-.42.01-.81.18-1.1.48-.29.3-.44.71-.43 1.12-.02.43.13.85.43 1.15s.71.48 1.14.47c.42 0 .83-.19 1.1-.51v1.07c-.35.18-.75.27-1.14.27a2.427 2.427 0 0 1-2.47-2.44c0-.66.27-1.28.74-1.74.46-.46 1.09-.71 1.75-.71zm9.62.11h.99l-2.03 4.8h-.49l-1.98-4.8h.99l1.25 3.14 1.27-3.14zm1.4 0h2.6v.79H26.4v1.04h1.62v.79H26.4v1.26h1.68v.79h-2.6v-4.67zm5.14 2.72c.65-.1 1.11-.69 1.06-1.34 0-.88-.6-1.37-1.66-1.37h-1.34v4.64h.92v-1.85h.1l1.27 1.85h1.11l-1.46-1.93zm-.72-.56h-.3v-1.41h.29c.55 0 .86.23.86.73.01.49-.31.68-.85.68z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="related-products-section py-10">
          <div className="container">
            <h3 className=" text-3xl lg:text-5xl heading-color font-semibold mb-6">Related products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="product-cart-box w-full relative max-w-full xl:max-w-[300px] bg-white border border-gray-200 rounded-2xl shadow-sm p-4 text-center flex flex-col justify-between"
                >
                  {/* Top-right icons: Wishlist, Compare, View */}
                  <div className="features-icon absolute z-[10] top-4 right-4 flex flex-col gap-2">
                    <button
                      type="button"
                      className={`features-icons hover:bg-orange-500 hover:text-white transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer ${wishlist.some((p) => p.id === item.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const isInWishlist = wishlist.some((p) => p.id === item.id);
                        handleWishList(item);
                        showNotification(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
                      }}
                      title={wishlist.some((p) => p.id === item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </button>
                    <button
                      type="button"
                      className={`features-icons hover:bg-orange-500 hover:text-white transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer ${compareList.some((p) => p.id === item.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const isInCompare = compareList.some((p) => p.id === item.id);
                        handleCompare(item);
                        showNotification(isInCompare ? "Removed from compare!" : "Added to compare!");
                      }}
                      title={compareList.some((p) => p.id === item.id) ? 'Remove from Compare' : 'Add to Compare'}
                    >
                      <CompareIcon fontSize="small" />
                    </button>
                    <button
                      type="button"
                      className="features-icons hover:bg-orange-500 hover:text-white bg-gray-100 text-black transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${createSlug(item.title)}`);
                      }}
                      title="View Product"
                    >
                      <VisibilityIcon fontSize="small" />
                    </button>
                  </div>
                  {/* Product Image */}
                  <div className="product-img mb-4 flex justify-center">
                    <Link to={`/products/${createSlug(item.title)}`}>
                      <LazyLoadImage
                        loading="lazy"
                        src={item.thumbnail}
                        alt={item.title}
                        effect="blur"
                        className="w-full h-60 object-contain"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3
                      className="text-lg font-semibold truncate"
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 uppercase">
                      {item.category}
                    </p>
                  </div>
                  {/* Extra details */}
                  <div className="mt-3 text-left text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">Brand:</span>
                      <span className="text-gray-500">{item.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => {
                          const ratingValue = i + 1;
                          if (parseFloat(item.rating) === 5) {
                            return (
                              <span key={i} className="text-yellow-500">
                                ★
                              </span>
                            );
                          }
                          if (parseFloat(item.rating) >= ratingValue) {
                            return (
                              <span key={i} className="text-yellow-500">
                                ★
                              </span>
                            );
                          } else if (
                            parseFloat(item.rating) >=
                            ratingValue - 0.5
                          ) {
                            return (
                              <span key={i} className="text-yellow-500">
                                ☆
                              </span>
                            );
                          } else {
                            return (
                              <span key={i} className="text-gray-300">
                                ★
                              </span>
                            );
                          }
                        })}
                        <span className="ml-2 text-sm text-gray-600">
                          {parseFloat(item.rating).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">Stock:</span>
                      <span className="text-green-600">
                        {item.stock} available
                      </span>
                    </div>
                  </div>
                  {/* Footer: Price & Button */}
                  <div className="product-price-button flex justify-between items-center border-t border-gray-200 mt-4 pt-3">
                    <span className="font-semibold text-gray-900">
                      ${item.price}
                    </span>
                    <button
                      type="button"
                      className="text-gray-700 font-medium hover:text-black"
                      onClick={() => {
                        addToCart(item);
                        showNotification("Added to cart!");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Notification popup for related products */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-orange-500 text-white px-6 py-2 rounded shadow-lg text-base font-medium transition-all">
          {notification}
        </div>
      )}
    </>
  );
};

export default SingleProductPage;
