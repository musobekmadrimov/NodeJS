const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

// READ METHOD
router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.send(categories);
});

// SHOW METHOD
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).send("So'ralgan kategoriya topilmadi!");
  }
  res.send(category);
});

// CREATE METHOD
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const category = new Category({
    name: req.body.name,
  });

  try {
    const savedCategory = await category.save();
    res.status(201).send(savedCategory);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE METHOD
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send("So'ralgan kategoriya topilmadi!");
  }
  res.send(category);
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const result = await Category.findByIdAndRemove({
    _id: req.params.id,
  });
  res.send(result);
});

module.exports = router;
