const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test")
  .then(() => {
    console.log("MongoDB ga ulanish hosil qilindi....");
  })
  .catch((err) => {
    console.error("MongoDB ga ulanish paytida xatolik ro'y berdi.", err);
  });

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Book = new mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "NodeJS to'liq qo'llanma",
    author: "Musobek Madrimov",
    tags: ["JS", "Dasturlash", "Node"],
    isPublished: true,
  });

  const savedBook = await book.save();

  console.log(savedBook);
}

async function getBooks() {
//   const pageNumber = 3;
//   const pageSize = 10;
  const books = await Book.find({
    author: "Atabayev Muhammad",
    // price: { $gt: 10, $lt: 20 },
    // author: /^M/, //Muallif ismi F dan boshlanadigan regEx ^ === startsWith
    // author: /ov$/i, // Muallif ismi od bilan tugaydigan regEx $ === endsWith
    // author: /.*so.*/i, // Muallif ismida ham so'zi mavjudligini tekshiradigan regEx $ === endsWith
  })
    //.and([{author: "Musobek Madrimov"}, { isPublished: true}])
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
    // .count();
    .select({
      name: 1,
      tags: 1,
    });
  console.log(books);
}

getBooks();
