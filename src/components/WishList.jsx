import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import image from "../assets/images/img2.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAuth } from "../context/AuthProvider";
import { useWishList } from "../context/WishListProvider";
import { useCart } from "../context/CartProvider";
import Login from "../layout/Login";

const Wishlist = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const { isLoggedIn } = useAuth();
  const { wishlist, removeFromWishlist, moveToCart } = useWishList();
  const { addToCart } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  
  // Ensure isOpen is always a boolean
  const dialogOpen = Boolean(isOpen);
  const LoginOpen = Boolean(showLogin);

  // Safe close handler that won't be undefined
  const safeOnClose = typeof onClose === 'function' ? onClose : () => {};

  useEffect(() => {
    if (dialogOpen && !isLoggedIn) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [dialogOpen, isLoggedIn]);

  const handleCloseLogin = () => {
    setShowLogin(false);
    safeOnClose();
  };

  if (!isLoggedIn) {
    return (
      <Login 
        isOpen={LoginOpen} 
        onClose={handleCloseLogin} 
        onSwitchToSignUp={onSwitchToSignUp}
      />
    );
  }

  return (
    <Dialog open={dialogOpen} onClose={safeOnClose} className="relative z-[999]">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-[400px] md:w-[600px] bg-white shadow-lg flex flex-col">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="font-semibold heading-color text-xl">
            Recently added ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
          </h2>
          <button onClick={safeOnClose} className="heading-color">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {wishlist.length === 0 ? (
            <div className="text-center text-gray-500 py-10">Your wishlist is empty.</div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 md:gap-8 border-b pb-8 mb-6">
                <div className="flex gap-4 flex-col">
                  <LazyLoadImage
                    loading="lazy"
                    src={item.thumbnail || (item.images && item.images[0]) || item.image || image}
                    effect="blur"
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium heading-color mb-2">{item.title}</h3>
                    {item.options && (
                      <div className="text-sm heading-color mb-1">{item.options}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between gap-3">
                  <div className="price-option flex item-start flex-col justify-start gap-4">
                    <span className="font-semibold text-black text-right">
                      ${item.price?.toFixed(2) || '—'}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-2 heading-color text-sm">
                    <button className="flex items-center gap-1 hover:text-red-700" onClick={() => removeFromWishlist(item.id)}>
                      <DeleteOutlineIcon fontSize="small" /> Remove
                    </button>
                    <button className="flex items-center gap-1 heading-color hover:text-orange-500" onClick={() => moveToCart(item, addToCart)}>
                      <ShoppingCartOutlinedIcon fontSize="small" /> Move to cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t text-center">
          <Link
            onClick={safeOnClose}
            className="heading-color font-medium hover:underline hover:text-orange-500"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </Dialog>
  );
};

export default Wishlist;