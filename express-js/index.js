const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const books = [
  { id: 1, name: "Rich dad poor dad" },
  { id: 2, name: "Good to great" },
  { id: 3, name: "Atomic habits" },
  { id: 4, name: "A million dollar mistakes" },
];

app.get("/", (req, res) => {
  res.send("Salom");
});

// GET Request for getting all books
app.get("/api/books", (req, res) => {
  res.send([books]);
});

// GET Request for getting a special book
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);
  if (!book) {
    return res.status(404).send("So'ralgan kitob topilmadi!");
  }
  res.send(book);
});

// POST METHOD
app.post("/api/books", (req, res) => {
  const { error } = validateBook(req.body);
  // agarda so'rovda validatsiyadan o'tmasa 400 qaytarish
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const book = {
    id: books.length + 1,
    name: req.body.name,
  };

  books.push(book);
  res.status(201).send(book);
});

// PUT METHOD
app.put("/api/books/:id", (req, res) => {
  // Kitobni izlab topish
  const book = books.find((b) => b.id === +req.params.id);
  // agar kitob bo'lmasa 404 qaytarish
  if (!book) {
    return res.status(404).send("So'ralgan kitob topilmadi!");
  }

  const { error } = validateBook(req.body);
  // agarda so'rovda validatsiyadan o'tmasa 400 qaytarish
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // validatsiyadan o'tsa kitobni yangilaymiz va yangilangan kitobni qaytaramiz
  book.name = req.body.name;
  res.send(book);
});

// DELETE METHOD
app.delete("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === +req.params.id);
  // agar kitob bo'lmasa 404 qaytarish
  if (!book) {
    return res.status(404).send("So'ralgan kitob topilmadi!");
  }

  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);
  res.send(book);
});

function validateBook(book) {
  // agar kitob topilsa so'rovni validatsiya qilish
  const bookSchema = Joi.object({
    name: Joi.string().required().min(3),
  });
  return bookSchema.validate(book);
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} portni eshitishni boshladim!`);
});
