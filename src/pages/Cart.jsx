import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import image from "../assets/images/img2.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";
import Login from "../layout/Login";

const Cart = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const { isLoggedIn } = useAuth();
  const { cartItems, total, removeFromCart, updateQty, clearCart } = useCart();
  const [showLogin, setShowLogin] = useState(false);

  // Ensure isOpen is always a boolean
  const dialogOpen = Boolean(isOpen);
  const LoginOpen = Boolean(showLogin);

  // Safe close handler that won't be undefined
  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

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
    return <Login isOpen={LoginOpen} onClose={handleCloseLogin} onSwitchToSignUp={onSwitchToSignUp} />;
  }

  return (
    <Dialog open={dialogOpen} onClose={safeOnClose} className="relative z-[999]">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-[400px] md:w-[600px] bg-white shadow-lg flex flex-col">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="font-semibold heading-color text-xl">
            Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h2>
          <button onClick={safeOnClose} className="heading-color">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 md:gap-8 border-b pb-8 mb-6">
                <div className="flex gap-4 flex-col sm:flex-row">
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
                  <div className="price-option flex flex-col items-end gap-4">
                    <span className="font-semibold text-black text-right">
                      ${item.price.toFixed(2)}
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={e => updateQty(item.id, Math.max(1, Number(e.target.value)))}
                      className="border rounded w-[70px] px-2 py-1 text-sm text-center"
                    />
                  </div>
                  <div className="flex gap-3 mt-2 heading-color text-sm">
                    <button className="flex items-center gap-1 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                      <DeleteOutlineIcon fontSize="small" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="p-4 border-t">
          <div className="flex justify-between mb-3 heading-color">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={clearCart}
            className="mb-3 block w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
            disabled={cartItems.length === 0}
          >
            Clear Cart
          </button>
          <Link
            onClick={safeOnClose}
            to="/checkout"
            className="block bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition text-center"
          >
            Proceed to Checkout
          </Link>
          <Link
            onClick={safeOnClose}
            className="mt-3 block text-center heading-color font-medium hover:underline hover:text-orange-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Dialog>
  );
};

export default Cart;
