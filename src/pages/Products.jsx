import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams, useNavigate } from "react-router-dom";
import { productData, productCategory } from "../api/Api";
import CompareIcon from "@mui/icons-material/Compare";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../components/Loader";
import SecurePayment from "../components/SecurePayment";
import { useWishList } from "../context/WishListProvider";
import { useCompare } from "../context/CompareProvider";
import { useCart } from "../context/CartProvider";

const Products = () => {
  // Category params
  const { category } = useParams(); // e.g. "beauty", "electronics", "fragrances", "mobile-accessories"

  // ----------------- States -----------------
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  // This are the params url state
  const [currentPage, setCurrentPage] = useState(0);
  const [sortType, setSortType] = useState("menu_order");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const itemsPerPage = 9;

  // (URL params removed for clean URL)

  // ----------------- Fetch Products + Categories -----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Products API (always 194 products)
        const data = await productData(194);
        setProducts(data?.products || []);

        // Categories API
        const catData = await productCategory();

        // ✅ safe check for API response
        if (Array.isArray(catData)) {
          setCategories(catData);
        } else if (Array.isArray(catData?.categories)) {
          setCategories(catData.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.log("API fetch error", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Normalize category slug for comparison
  const normalizeCategorySlug = (slug) => slug?.toLowerCase().replace(/[^a-z0-9]/g, '');

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
      setCurrentPage(0);
    }
  }, [category]);

  // ----------------- Sorting Logic -----------------
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortType) {
      case "price":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "latest":
        return new Date(b.meta.createdAt) - new Date(a.meta.createdAt);
      default:
        return 0;
    }
  });

  // ----------------- Improved Filter Logic -----------------
  const filteredProducts = sortedProducts.filter((p) => {
    // ✅ Check price
    const inPriceRange = p.price >= 0 && p.price <= priceRange[1];

    // ✅ If no categories selected, just filter by price
    if (selectedCategories.length === 0) return inPriceRange;

    // ✅ Get product category name (handle different API structures)
    let productCategoryName = "";
    if (typeof p.category === "string") {
      productCategoryName = p.category;
    } else if (p.category?.name) {
      productCategoryName = p.category.name;
    } else if (p.category?.title) {
      productCategoryName = p.category.title;
    }

    // ✅ Normalize category names for comparison - remove all non-alphanumeric characters and convert to lowercase
    const normalizeCategory = (name) => {
      return name.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const normalizedProductCategory = normalizeCategory(productCategoryName);

    // If category is present in URL, filter by slug
    if (category) {
      const normalizedCategorySlug = normalizeCategorySlug(category);
      return inPriceRange && normalizedProductCategory === normalizedCategorySlug;
    }

    // Otherwise, filter by selected categories
    return inPriceRange && selectedCategories.some(selectedCat => {
      const normalizedSelectedCat = normalizeCategory(selectedCat);
      return normalizedProductCategory === normalizedSelectedCat;
    });
  });

  // ----------------- Pagination -----------------
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  };

  // ----------------- Handlers -----------------
  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(0);
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
    setCurrentPage(0);
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  };

  const toggleCategory = (cat) => {
    let updated;
    if (selectedCategories.includes(cat)) {
      updated = selectedCategories.filter((c) => c !== cat);
    } else {
      updated = [...selectedCategories, cat];
    }
    setSelectedCategories(updated);
    setCurrentPage(0);
    setFilterLoading(true);
    setTimeout(() => {
      setFilterLoading(false);
    }, 300);
  };

  // Show loader during filtering operations
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filteredProducts, currentPage]);

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
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Notification state
  const [notification, setNotification] = useState("");
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 1500);
  };

  return (
    <>
    <section className="all-product-list mx-auto">
      <div className="container">
        <div className="row my-10 flex item-center justify-start flex-wrap mx-auto w-full">
          {/* ----------------- Main Product Section ----------------- */}
          <div className="w-full md:w-[70%] all-product-list">
            {/* Result Count + Sorting */}
            <div className="result flex flex-wrap gap-6 md:gap-0 justify-between items-center mb-4">
              <h4>
                {filteredProducts.length > 0 ? (
                  <>
                    Showing {offset + 1}–
                    {Math.min(offset + itemsPerPage, filteredProducts.length)}{" "}
                    of {filteredProducts.length} results
                  </>
                ) : (
                  "No products found matching your filters"
                )}
              </h4>
              <form>
                <select
                  className="rounded-lg outline-none border py-2 px-4 heading-color"
                  name="orderby"
                  value={sortType}
                  onChange={handleSortChange}
                >
                  <option value="menu_order">Default sorting</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                  <option value="rating">Sort by rating</option>
                  <option value="latest">Sort by latest</option>
                </select>
              </form>
            </div>

            {/* Products Grid with Loader */}
            {loading || filterLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.length > 0 ? (
                    currentItems.map((product) => {
                      // Function to render star ratings correctly
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
                      // Create SEO-friendly slug from title
                      const createSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      const productSlug = createSlug(product.title);
                      return (
                        <div
                          key={product.id}
                          className="product-cart-box w-full relative max-w-full xl:max-w-[300px] 2xl:md-w-[400px] bg-white border border-gray-200 rounded-2xl p-4 text-center cursor-pointer"
                          onClick={() => navigate(`/products/${productSlug}`)}
                        >
                          {/* Top-right icons */}
                          <div className="features-icon absolute z-[10] top-4 right-4 flex flex-col gap-2">
                            <button
                              type="button"
                              className={`features-icons transition rounded-full h-[40px] w-[40px] flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer ${wishlist?.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
                              onClick={e => {
                                e.stopPropagation();
                                const isInWishlist = wishlist?.some((p) => p.id === product.id);
                                handleWishList(product);
                                showNotification(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
                              }}
                              title={wishlist?.some((p) => p.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            >
                              <FavoriteBorderIcon fontSize="small" />
                            </button>
                            <button
                              type="button"
                              className={`features-icons transition rounded-full h-[40px] w-[40px] flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer ${compareList?.some((p) => p.id === product.id) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-black'}`}
                              onClick={e => {
                                e.stopPropagation();
                                const isInCompare = compareList?.some((p) => p.id === product.id);
                                handleCompare(product);
                                showNotification(isInCompare ? "Removed from compare!" : "Added to compare!");
                              }}
                              title={compareList?.some((p) => p.id === product.id) ? 'Remove from Compare' : 'Add to Compare'}
                            >
                              <CompareIcon fontSize="small" />
                            </button>
                            <button
                              type="button"
                              className={`features-icons transition rounded-full h-[40px] w-[40px] flex items-center justify-center hover:bg-orange-500 hover:text-white cursor-pointer bg-gray-100 text-black`}
                              onClick={e => { e.stopPropagation(); navigate(`/products/${createSlug(product.title)}`); }}
                              title="View Product"
                            >
                              <VisibilityIcon fontSize="small" />
                            </button>
                          </div>

                          {/* Product Image */}
                          <div className="product-img mb-4">
                            <LazyLoadImage
                              loading="lazy"
                              src={product.thumbnail}
                              alt={product.title}
                              effect="blur"
                              className="w-full h-72 object-contain"
                            />
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
                            <button
                              type="button"
                              className="text-gray-700 font-medium hover:text-black"
                              onClick={e => { e.stopPropagation(); addToCart(product); showNotification("Added to cart!"); }}
                            >
                              Add to cart
                            </button>
      {/* Notification Snackbar */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded shadow-lg z-[9999] transition-all">
          {notification}
        </div>
      )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-3 text-center py-10">
                      <p className="text-gray-500">No products found matching your filters</p>
                      <button 
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                          setSelectedCategories([]);
                          setPriceRange([0, 1000]);
                          setCurrentPage(0);
                          setFilterLoading(true);
                          setTimeout(() => {
                            setFilterLoading(false);
                          }, 300);
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                  <div className="flex my-10 md:my-20 justify-center">
                    <ReactPaginate
                      previousLabel={"← Previous"}
                      nextLabel={"Next →"}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={"flex gap-2 cursor-pointer w-full flex-wrap justify-center gap-4 pagination-links"}
                      pageClassName={"px-4 py-2 border rounded"}
                      activeClassName={"bg-orange-500 text-white"}
                      previousClassName={"px-4 py-2 border rounded"}
                      nextClassName={"px-4 py-2 border rounded"}
                      forcePage={currentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* ----------------- Sidebar Filters ----------------- */}
          <div className="w-full md:w-[30%] side-widget pl-0 md:pl-8">
            {/* Filter by Price (Single Slider) */}
            <div className="mb-8">
              <h4 className="font-semibold mb-2">Filter by price</h4>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(0, +e.target.value)}
                className="w-full py-2 border-none outline-none  accent-orange-500"
              />
              <p className="mt-2">
                Price: <b>$0</b> - <b>${priceRange[1]}</b>
              </p>
            </div>

            {/* Filter by Category (Dynamic from API) - 2 column layout */}
            <div className="mb-8">
              <h4 className="font-semibold mb-2">Filter by category</h4>
              <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2  gap-2 mt-6">
                {categories.length > 0 ? (
                  categories.map((cat, i) => {
                    const categoryName = typeof cat === "string" ? cat : cat.name; // handle both cases
                    // Normalize for slug comparison
                    const normalizeCategory = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const normalizedCategoryName = normalizeCategory(categoryName);
                    const normalizedSelected = selectedCategories.map(normalizeCategory);
                    // If navigated via /products/:category, auto-check the correct box
                    const isChecked = normalizedSelected.includes(normalizedCategoryName);
                    return (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id={`category-${i}`}
                          checked={isChecked}
                          onChange={() => toggleCategory(categoryName)}
                          className="category-checkbox accent-orange-500 h-[18px] w-[18px] text-white border-none outline-none"
                        />
                        <label htmlFor={`category-${i}`} className="text-sm cursor-pointer">
                          {categoryName}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>No categories found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SecurePayment/>
    </>
  );
};

export default Products;