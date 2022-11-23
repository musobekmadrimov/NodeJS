const express = require("express");
const router = express.Router();
const Joi = require("joi");

const categories = [
    { id: 1, name: "Dasturlash" },
    { id: 2, name: "Ma'lumot omborlari" },
    { id: 3, name: "Kompyuter tarmoqlari" },
    { id: 4, name: "Ma'lumot xavfsizligi" },
  ];
  
  
  
  // GET Request for getting all categories
  router.get("/", (req, res) => {
    res.send(categories);
  });
  
  // GET Request for getting a special book
  router.get("/:id", (req, res) => {
    const category = categories.find((b) => b.id === +req.params.id);
    if (!category) {
      return res.status(404).send("So'ralgan kategoriya topilmadi!");
    }
    res.send(category);
  });
  
  // POST METHOD
  router.post("/", (req, res) => {
    const { error } = validateCategory(req.body);
    // agarda so'rovda validatsiyadan o'tmasa 400 qaytarish
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const category = {
      id: categories.length + 1,
      name: req.body.name,
    };
  
    categories.push(category);
    res.status(201).send(category);
  });
  
  // PUT METHOD
  router.put("/:id", (req, res) => {
    // Kategoriyani izlab topish
    const category = categories.find((b) => b.id === +req.params.id);
    // agar kategoriya bo'lmasa 404 qaytarish
    if (!category) {
      return res.status(404).send("So'ralgan kategoriya topilmadi!");
    }
  
    const { error } = validateCategory(req.body);
    // agarda so'rovda validatsiyadan o'tmasa 400 qaytarish
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // validatsiyadan o'tsa kitobni yangilaymiz va yangilangan kitobni qaytaramiz
    category.name = req.body.name;
    res.send(category);
  });
  
  // DELETE METHOD
  router.delete("/:id", (req, res) => {
    const category = categories.find((b) => b.id === +req.params.id);
    // agar kategoriya bo'lmasa 404 qaytarish
    if (!category) {
      return res.status(404).send("So'ralgan kategoriya topilmadi!");
    }
  
    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);
    res.send(category);
  });
  
  function validateCategory(category) {
    // agar kategoriya topilsa so'rovni validatsiya qilish
    const categorySchema = Joi.object({
      name: Joi.string().required().min(3),
    });
    return categorySchema.validate(category);
  }


  module.exports = router;