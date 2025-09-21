import React, { useEffect, useState } from "react";
import CompareIcon from "@mui/icons-material/Compare";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { productData } from "../api/Api";
import { useCart } from "../context/CartProvider";
import { useWishList } from "../context/WishListProvider";
import { useCompare } from "../context/CompareProvider";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({product, showNotification}) => {

  const [products, setProducts] = useState([]);
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
  const [feedbackId, setFeedbackId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductCat = async () => {
      const data = await productData();
      setProducts(data.products);
    };

    fetchProductCat();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 md:gap-4 xl:gap-6 mt-10 justify-start w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-cart-box w-full relative xs:max-w-full md:max-w-[48.5%] xl:max-w-[300px] 2xl:md-w-[400px] bg-white border border-gray-200 rounded-2xl shadow-sm p-4 text-center"
        >
          {/* Top-right icons */}
          <div className="features-icon z-[10] absolute top-4 right-4 flex flex-col gap-2">
            <button
              type="button"
              className={`features-icons hover:bg-orange-500 hover:text-white transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer ${wishlist?.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
              onClick={e => {
                e.stopPropagation();
                const isInWishlist = wishlist?.some((p) => p.id === product.id);
                handleWishList(product);
                setFeedbackId(product.id + "-wishlist");
                if (showNotification) {
                  showNotification(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
                }
                setTimeout(() => setFeedbackId(null), 1200);
              }}
              title={wishlist?.some((p) => p.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <FavoriteBorderIcon fontSize="small" />
            </button>
            <button
              type="button"
              className={`features-icons  hover:bg-orange-500 hover:text-white transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer ${compareList?.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
              onClick={e => {
                e.stopPropagation();
                const isInCompare = compareList?.some((p) => p.id === product.id);
                handleCompare(product);
                setFeedbackId(product.id + "-compare");
                if (showNotification) {
                  showNotification(isInCompare ? "Removed from compare!" : "Added to compare!");
                }
                setTimeout(() => setFeedbackId(null), 1200);
              }}
              title={compareList?.some((p) => p.id === product.id) ? 'Remove from Compare' : 'Add to Compare'}
            >
              <CompareIcon fontSize="small" />
            </button>
            <button
              type="button"
              className="features-icons hover:bg-orange-500 hover:text-white bg-gray-100 text-black hover:bg-orange-500 hover:text-white transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                navigate(`/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`);
              }}
              title="View Product"
            >
              <VisibilityIcon fontSize="small" />
            </button>
          </div>

          {/* Product Image */}
          <div className="product-img mb-4">
            <Link to={`/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
              <LazyLoadImage
                loading="lazy"
                src={product.thumbnail}
                alt={product.title}
                effect="blur"
                className="w-full h-72 object-contain"
              />
            </Link>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-500 text-sm mt-2 uppercase">
              {product.category}
            </p>
          </div>

          {/* Extra details */}
          <div className="mt-3 text-left text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">Brand:</span>
              <span className="text-gray-500">{product.brand}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1; // star number (1–5)

                  if (product.rating >= ratingValue) {
                    // Full star
                    return (
                      <StarIcon
                        key={i}
                        fontSize="small"
                        className="text-yellow-500"
                      />
                    );
                  } else if (product.rating >= ratingValue - 0.5) {
                    // Half star
                    return (
                      <StarHalfIcon
                        key={i}
                        fontSize="small"
                        className="text-yellow-500"
                      />
                    );
                  } else {
                    // Empty star
                    return (
                      <StarBorderIcon
                        key={i}
                        fontSize="small"
                        className="text-gray-300"
                      />
                    );
                  }
                })}

                {/* Numeric rating */}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">Stock:</span>
              <span className="text-green-600">{product.stock} available</span>
            </div>
          </div>

          {/* Footer: Price & Button */}
          <div className="product-price-button flex justify-between items-center border-t border-gray-200 mt-4 pt-3">
            <span className="font-semibold text-gray-900">
              ${product.price}
            </span>
            <button
              className="text-gray-700 font-medium hover:text-black"
              onClick={() => {
                addToCart(product);
                if (showNotification) {
                  showNotification("Added to cart!");
                }
              }}
            >
              Add to cart
            </button>
          </div>
          {/* Removed per-card cart feedback */}
          {/* Removed per-card feedback for wishlist/compare */}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
