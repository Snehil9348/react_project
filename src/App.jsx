import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import OnlineBookstore from "./book";
import CheckoutPage from "./checkoutpage";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <Link to="/" className="mr-4 hover:underline">Bookstore</Link>
        <Link to="/checkout" className="hover:underline inline">Checkout 
        <span style={{color : "red",paddingLeft: "3px"}}>{cart.length}</span>
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<OnlineBookstore cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} setCart={setCart} clearCart={clearCart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
