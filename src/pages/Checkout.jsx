
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartProvider";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingType, setShippingType] = useState("delivery");
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const shippingCost = 5;

  const handleCheckout = (e) => {
    e.preventDefault();
    clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    // Example: hardcoded code 'SAVE10' for $10 off
    if (discountCode.trim().toLowerCase() === "save10") {
      setDiscount(10);
      setAppliedCode("SAVE10");
    } else {
      setDiscount(0);
      setAppliedCode("");
      alert("Invalid discount code");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold heading-color mb-4">Your cart is empty</h2>
        <Link to="/products" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">Shop Now</Link>
      </div>
    );
  }

  return (
    <section className="checkout-section py-10">
      <div className="container max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Left: Shipping Info */}
        <form onSubmit={handleCheckout} className="flex-1 min-w-[320px] max-w-xl">
          <h2 className="text-2xl font-bold mb-6 heading-color">Checkout</h2>
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <button type="button" onClick={() => setShippingType("delivery")}
                className={`flex-1 border rounded-lg py-2 font-medium ${shippingType === "delivery" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-white border-gray-200 para"}`}
              >
                Delivery
              </button>
              <button type="button" onClick={() => setShippingType("pickup")}
                className={`flex-1 border rounded-lg py-2 font-medium ${shippingType === "pickup" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-white border-gray-200 para"}`}
              >
                Pick up
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium heading-color">Full name <span className="text-red-500">*</span></label>
              <input type="text" required placeholder="Enter full name" className="w-full border rounded px-4 py-2 para" />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium heading-color">Email address <span className="text-red-500">*</span></label>
              <input type="email" required placeholder="Enter email address" className="w-full border rounded px-4 py-2 para" />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium heading-color">Phone number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <select className="border rounded px-2 py-2 para">
                  <option value="IN">🇮🇳 +91</option>
                  <option value="US">🇺🇸 +1</option>
                  <option value="UK">🇬🇧 +44</option>
                </select>
                <input type="tel" required placeholder="Enter phone number" className="flex-1 border rounded px-4 py-2 para" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium heading-color">Country <span className="text-red-500">*</span></label>
              <select required className="w-full border rounded px-4 py-2 para">
                <option value="">Choose country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium heading-color">City</label>
                <input type="text" required placeholder="Enter city" className="w-full border rounded px-4 py-2 para" />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium heading-color">State</label>
                <input type="text" required placeholder="Enter state" className="w-full border rounded px-4 py-2 para" />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium heading-color">ZIP Code</label>
                <input type="text" required placeholder="Enter ZIP code" className="w-full border rounded px-4 py-2 para" />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" required className="accent-orange-500" id="terms" />
              <label htmlFor="terms" className="para text-sm">I have read and agree to the Terms and Conditions.</label>
            </div>
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded font-semibold hover:bg-orange-600 transition mt-2">Pay Now</button>
        </form>

        {/* Right: Cart Review */}
        <div className="flex-1 min-w-[320px] max-w-xl bg-orange-50 rounded-lg p-6 flex flex-col gap-6">
          <h3 className="text-xl font-bold mb-2 heading-color">Review your cart</h3>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.thumbnail || (item.images && item.images[0]) || item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium heading-color">{item.title}</div>
                  <div className="para text-sm">{item.qty}x</div>
                </div>
                <div className="font-semibold heading-color">${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleApplyDiscount} className="flex gap-2 mt-2 items-center relative">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value)}
                className="w-full border rounded px-3 py-2 para pr-8"
              />
              {discountCode && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                  onClick={() => { setDiscountCode(""); setDiscount(0); setAppliedCode(""); }}
                  tabIndex={-1}
                  aria-label="Clear coupon"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
            </div>
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition">Apply</button>
          </form>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between para text-base">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between para text-base">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between para text-base text-green-600">
                <span>Discount ({appliedCode})</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold heading-color text-lg mt-2">
              <span>Total</span>
              <span>${(total + shippingCost - discount).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 bg-white rounded-lg p-4 border border-gray-200">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" stroke="#f47630" strokeWidth="2"/><path d="M19.07 4.93A10 10 0 104.93 19.07 10 10 0 0019.07 4.93z" stroke="#f47630" strokeWidth="2"/></svg>
            <div>
              <div className="font-medium heading-color">Secure Checkout - SSL Encrypted</div>
              <div className="para text-sm">Ensuring your financial and personal details are secure during every transaction.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
