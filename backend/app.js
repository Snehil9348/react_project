const express = require('express');
const fs = require("fs");
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let books = [

  {
    "id": 1,
    "title": "The Great Adventure",
    "author": "John Doe",
    "isbn": "978-3-16-148410-0",
    "price": 19.99,
    "currency": "USD",
    "stock": 25,
    "genre": "Adventure",
    "description": "An exciting journey of exploration and discovery.",
    "cover_image": "https://api-web.getepic.com/utils/resize.jpg?quality=100&url=https:%2F%2Fcdn.getepic.com%2Fdrm%2F6%2F78966%2Fcover_large%402x.png&width=1200"
  },
  {
    "id": 2,
    "title": "The Mystery of Shadows",
    "author": "Jane Smith",
    "isbn": "978-1-23-456789-1",
    "price": 15.99,
    "currency": "USD",
    "stock": 10,
    "genre": "Mystery",
    "description": "A thrilling mystery novel that will keep you on the edge of your seat.",
    "cover_image": "https://www.carlsen.de/sites/default/files/produkt/cover/the-mystery-of-shadows.jpg"
  },
  {
    "id": 3,
    "title": "Cooking with Love",
    "author": "Emily Brown",
    "isbn": "978-0-12-345678-2",
    "price": 24.99,
    "currency": "USD",
    "stock": 50,
    "genre": "Cookbook",
    "description": "A collection of delicious and heartwarming recipes.",
    "cover_image": "https://tse2.mm.bing.net/th?id=OIP.6plTNe6o323MZVvoNAKP2gHaJm&pid=Api&P=0&h=180"
  },
  {
    "id": 4,
    "title": "The Digital Revolution",
    "author": "Alice Green",
    "isbn": "978-1-98-765432-3",
    "price": 29.99,
    "currency": "USD",
    "stock": 12,
    "genre": "Technology",
    "description": "An in-depth look at the digital age and its impact on society.",
    "cover_image": "https://res.cloudinary.com/dk-hub/image/upload/c_limit,f_auto,w_580,h_650/dk-core-nonprod/9781405356411/9781405356411_cover.jpg"
  },
  {
    "id": 5,
    "title": "The Chronicles of Time",
    "author": "William King",
    "isbn": "978-0-89-765432-4",
    "price": 22.99,
    "currency": "USD",
    "stock": 8,
    "genre": "Sci-Fi",
    "description": "A science fiction epic that spans across different eras and timelines.",
    "cover_image": "http://prodimage.images-bn.com/pimages/9781538034637_p0_v2_s1200x630.jpg"
  },
  {
    "id": 6,
    "title": "Healthy Living",
    "author": "Sarah White",
    "isbn": "978-1-67-543210-5",
    "price": 18.99,
    "currency": "USD",
    "stock": 35,
    "genre": "Health & Wellness",
    "description": "Practical tips for living a healthier and happier life.",
    "cover_image": "https://m.media-amazon.com/images/I/A1eoXCAafkL._SL1500_.jpg"
  },
  {
    "id": 7,
    "title": "The Art of Painting",
    "author": "Michael Carter",
    "isbn": "978-2-33-455678-6",
    "price": 34.99,
    "currency": "USD",
    "stock": 15,
    "genre": "Art",
    "description": "A step-by-step guide to mastering the art of painting.",
    "cover_image": "https://i.pinimg.com/originals/e6/e3/6c/e6e36cf6ea08bd3929ca355bf2860668.jpg"
  },
  {
    "id": 8,
    "title": "The Magic of Books",
    "author": "Isabella Blue",
    "isbn": "978-1-24-678901-7",
    "price": 14.99,
    "currency": "USD",
    "stock": 40,
    "genre": "Fantasy",
    "description": "A captivating tale of magic, mystery, and adventure.",
    "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1527436819i/38255182.jpg"
  },
  {
    "id": 9,
    "title": "Business Strategies for Success",
    "author": "David Grey",
    "isbn": "978-0-55-987654-8",
    "price": 39.99,
    "currency": "USD",
    "stock": 5,
    "genre": "Business",
    "description": "Effective strategies to grow and succeed in the business world.",
    "cover_image": "https://media.s-bol.com/qJX2KwW51oy/550x823.jpg"
  },
  {
    "id": 10,
    "title": "The World of Plants",
    "author": "Sophia Martin",
    "isbn": "978-1-99-876543-9",
    "price": 17.99,
    "currency": "USD",
    "stock": 60,
    "genre": "Nature",
    "description": "An informative and beautifully illustrated guide to the plant kingdom.",
    "cover_image": "https://www.greatriverlearning.com/sites/default/files/blair_accesscard_catalog.jpg"
  },
  {
    "id": 11,
    "title": "Secrets of the Ocean",
    "author": "Robert Blue",
    "isbn": "978-3-21-654987-0",
    "price": 25.99,
    "currency": "USD",
    "stock": 22,
    "genre": "Nature",
    "description": "A deep dive into the mysteries of the world's oceans.",
    "cover_image": "https://m.media-amazon.com/images/I/81d8OXfG7zL._AC_SL1486_.jpg"
  },
  {
    "id": 12,
    "title": "AI and the Future",
    "author": "Rachel Adams",
    "isbn": "978-2-10-876543-1",
    "price": 27.99,
    "currency": "USD",
    "stock": 17,
    "genre": "Technology",
    "description": "Exploring the potential of artificial intelligence in shaping tomorrow.",
    "cover_image": "https://tse2.mm.bing.net/th?id=OIP.bjkKdcPpRgy6Yh1W4ZO5pgAAAA&pid=Api&P=0&h=180"
  },
  {
    "id": 13,
    "title": "The Ancient Kingdoms",
    "author": "Liam Steele",
    "isbn": "978-4-56-783234-3",
    "price": 32.99,
    "currency": "USD",
    "stock": 19,
    "genre": "History",
    "description": "A journey through the ancient civilizations that shaped the world.",
    "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1695124284i/198238329.jpg"
  },
  {
    "id": 14,
    "title": "Tech Innovations 2025",
    "author": "Zoe Chen",
    "isbn": "978-5-12-687654-7",
    "price": 21.99,
    "currency": "USD",
    "stock": 30,
    "genre": "Technology",
    "description": "A look at the most exciting technological advancements coming in 2025.",
    "cover_image": "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781352011173.jpg"
  },
  {
    "id": 15,
    "title": "The Healing Power of Nature",
    "author": "Anna White",
    "isbn": "978-6-34-453210-1",
    "price": 15.99,
    "currency": "USD",
    "stock": 45,
    "genre": "Health & Wellness",
    "description": "How nature can restore and heal your mind and body.",
    "cover_image": "https://tse2.mm.bing.net/th?id=OIP.3khLQ_1945PJcf70WLhrKAHaLH&pid=Api&P=0&h=180"
  },
  {
    "id": 16,
    "title": "The Silent Forest",
    "author": "Marcus Gray",
    "isbn": "978-7-65-342310-2",
    "price": 19.99,
    "currency": "USD",
    "stock": 14,
    "genre": "Thriller",
    "description": "A chilling thriller set in the deep, isolated forest.",
    "cover_image": "https://m.media-amazon.com/images/I/51zDbA8S4CL.jpg"
  },
  {
    "id": 17,
    "title": "Cooking for the Soul",
    "author": "Clara Green",
    "isbn": "978-8-11-732468-3",
    "price": 23.99,
    "currency": "USD",
    "stock": 40,
    "genre": "Cookbook",
    "description": "A beautiful collection of soulful and nutritious recipes.",
    "cover_image": "http://prodimage.images-bn.com/pimages/9781537109671_p0_v1_s1200x630.jpg"
  },
  {
    "id": 18,
    "title": "The Stars Above",
    "author": "Emily Frost",
    "isbn": "978-9-87-654231-0",
    "price": 29.99,
    "currency": "USD",
    "stock": 10,
    "genre": "Fantasy",
    "description": "A fantasy novel exploring the mysteries of the stars.",
    "cover_image": "https://i.pinimg.com/736x/e0/7a/7e/e07a7ea7ffaded2fdf06f47ef415fc43.jpg"
  },
  {
    "id": 19,
    "title": "The Warrior's Code",
    "author": "Jason Black",
    "isbn": "978-0-34-765432-9",
    "price": 24.99,
    "currency": "USD",
    "stock": 33,
    "genre": "Adventure",
    "description": "An epic tale of courage, loyalty, and honor in battle.",
    "cover_image": "http://prodimage.images-bn.com/pimages/9781088208489_p0_v1_s1200x630.jpg"
  },
  {
    "id": 20,
    "title": "Deep Space Exploration",
    "author": "Ryan White",
    "isbn": "978-1-43-324567-8",
    "price": 35.99,
    "currency": "USD",
    "stock": 25,
    "genre": "Science",
    "description": "A deep dive into humanity's exploration of outer space.",
    "cover_image": "https://m.media-amazon.com/images/I/71aR9oohz4L._SL1500_.jpg"
  }  
];

const ordersFilePath = "./orders.json";

// Check if the file exists, if not, create it with an empty array
if (!fs.existsSync(ordersFilePath)) {
  fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2), "utf-8");
  console.log("orders.json file created.");
}

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/cart', (req, res) => {
  const { bookId } = req.body;
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.status(200).json({ message: 'Book added to cart', book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.status(200).json({ message: 'Book removed from cart', book });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});


app.post("/api/orders", (req, res) => {
  const newOrder = req.body;

  const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8")) || [];
  orders.push(newOrder);

  fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

  res.status(201).json({ message: "Order saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
