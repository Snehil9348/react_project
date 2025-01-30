import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ children, className }) => (
  <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${className}`}
  >
    {children}
  </button>
);

const OnlineBookstore = ({ addToCart }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Online Bookstore</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id}>
            <CardContent>
              <div><img src={book.cover_image} alt="" width={100} height={100}/></div>
              <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-sm text-gray-600">By {book.author}</p>
              <p className="text-lg font-bold text-gray-800 mt-2">${book.price}</p>
              <Button className="mt-4 w-full" onClick={() => addToCart(book)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OnlineBookstore;
