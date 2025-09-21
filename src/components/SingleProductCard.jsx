import React from "react";
import CompareIcon from "@mui/icons-material/Compare";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import { useWishList } from "../context/WishListProvider";
import { useCompare } from "../context/CompareProvider";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const SingleProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishList();
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const navigate = useNavigate();

  // Toggle handlers for wishlist and compare
  const handleWishlist = () => {
    if (wishlist.some((p) => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCompare = () => {
    if (compareList.some((p) => p.id === product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleView = () => {
    navigate(`/products/${createSlug(product.title)}`);
  };

  const renderStars = (rating) => {
    const numericRating = parseFloat(rating);
    return [...Array(5)].map((_, i) => {
      const ratingValue = i + 1;
      if (numericRating === 5) {
        return <StarIcon key={i} fontSize="small" className="text-yellow-500" />;
      }
      if (numericRating >= ratingValue) {
        return <StarIcon key={i} fontSize="small" className="text-yellow-500" />;
      } else if (numericRating >= ratingValue - 0.5) {
        return <StarHalfIcon key={i} fontSize="small" className="text-yellow-500" />;
      } else {
        return <StarBorderIcon key={i} fontSize="small" className="text-gray-300" />;
      }
    });
  };

  // Create SEO-friendly slug from the product title (must match Products.jsx)
  const createSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="product-cart-box w-full relative max-w-full xl:max-w-[300px] 2xl:md-w-[400px] bg-white border border-gray-200 rounded-2xl shadow-sm p-4 text-center">
      {/* Top-right icons */}
      <div className="features-icon absolute z-[10] top-4 right-4 flex flex-col gap-2">
        <button
          type="button"
          className={`features-icons transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white ${wishlist?.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
          onClick={handleWishlist}
          title={wishlist?.some((p) => p.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <FavoriteBorderIcon fontSize="small" />
        </button>
        <button
          type="button"
          className={`features-icons transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white ${compareList?.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
          onClick={handleCompare}
          title={compareList?.some((p) => p.id === product.id) ? 'Remove from Compare' : 'Add to Compare'}
        >
          <CompareIcon fontSize="small" />
        </button>
        <button
          type="button"
          className="features-icons transition rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer bg-gray-100 text-black hover:bg-orange-500 hover:text-white"
          onClick={handleView}
          title="View Product"
        >
          <VisibilityIcon fontSize="small" />
        </button>
      </div>

      {/* Product Image */}
      <div className="product-img mb-4">
        <Link to={`/products/${createSlug(product.title)}`}>
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
            {renderStars(product.rating)}
            <span className="ml-2 text-sm text-gray-600">{parseFloat(product.rating).toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">Stock:</span>
          <span className="text-green-600">{product.stock} available</span>
        </div>
      </div>

      {/* Footer: Price & Button */}
      <div className="product-price-button flex justify-between items-center border-t border-gray-200 mt-4 pt-3">
        <span className="font-semibold text-gray-900">${product.price}</span>
        <Link to="#" className="text-gray-700 font-medium hover:text-black">
          Add to cart
        </Link>
      </div>
    </div>
  );
};

export default SingleProductCard;