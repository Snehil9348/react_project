import React, { useState } from "react";

const CheckoutPage = ({ cart, setCart, clearCart }) => {
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(cart.filter((book) => book.id !== bookId));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
  
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    if (
      !personalDetails.fullName ||
      !personalDetails.email ||
      !personalDetails.phone ||
      !personalDetails.address
    ) {
      alert("Please fill in all personal details!");
      return;
    }
  
    if (
      !paymentDetails.cardHolderName ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvv
    ) {
      alert("Please fill in all payment details!");
      return;
    }
  
    const orderData = {
      cart,
      personalDetails,
      paymentDetails,
      totalPrice,
      orderDate: new Date().toISOString(),
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        alert("Order placed successfully!");
        setOrderSuccess(true);
        clearCart(); // Clear the cart after placing the order
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };
  

  if (orderSuccess) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-green-600">Order Placed Successfully!</h1>
        <p className="text-center mt-4 text-gray-600">
          Thank you for your order! Your items will be delivered shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((book) => (
                <li
                  key={book.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <span className="font-medium text-gray-800">{book.title}</span>
                    <p className="text-sm text-gray-600">${book.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 font-medium"
                    onClick={() => handleRemoveFromCart(book.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t mt-4 pt-4 text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Personal and Payment Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
          <form onSubmit={handleOrder} className="space-y-6">
            {/* Personal Details */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={personalDetails.fullName}
                onChange={handlePersonalInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={personalDetails.email}
                onChange={handlePersonalInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={personalDetails.phone}
                onChange={handlePersonalInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={personalDetails.address}
                onChange={handlePersonalInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>

            <h2 className="text-2xl font-semibold mt-6">Payment Details</h2>
            {/* Payment Details */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
              <input
                type="text"
                name="cardHolderName"
                value={paymentDetails.cardHolderName}
                onChange={handlePaymentInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Expiry Date (MM/YY)</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentInputChange}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
