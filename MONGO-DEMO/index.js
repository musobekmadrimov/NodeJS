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
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  author: String,
  tags: {
    type: String,
    validate: {
      validator: function (val) {
        return  val && val.length > 0
      },
      message: "Kitobning kamida bitta tegi bo'lishi kerak"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: {
    type: Boolean,
    validate: {
      isAysnc: true,
      validator: function(param, callback) {
        setTimeout((param) => {
          const result = param;
          callback(param);
        }, 5000);
      }
    }
  },
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 300
  },
  category: {
    type: String, 
    required: true,
    enum: ["biography", "psycology" ,"self-improvement"]
  }
});

const Book = new mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "NodeJS to'liq qo'llanma",
    author: "Musobek Madrimov",
    tags: ["JS", "Dasturlash", "Node"],
    isPublished: false,
    price: 100,
    category: "self-improvement"
  });

  try {
    const savedBook = await book.save();
    console.log(savedBook);
  } catch (error) {
    console.log(error);
  }
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

async function updateBook1(id) {
  const book = await Book.findById(id);
  if (!book) {
    return;
  }

  // book.isPublished = true;
  // book.author = "Musobek Madrimov";

  book.set({
    isPublished: true,
    author: "Musobek Madrimov",
  });

  const updatedBook = await book.save();
  console.log(updatedBook);
}

async function updateBook2(id) {
  const result = await Book.update(
    { _id: id },
    {
      $set: {
        author: "Musobek",
        isPublished: false,
      },
    }
  );

  console.log(result);
}

async function deleteBook(id) {
  const result = await Book.findByIdAndRemove({ _id: id });
  // const result = await Book.deleteOne({ _id: id });
  console.log(result);
}

createBook();
