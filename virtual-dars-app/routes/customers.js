const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

// READ METHOD
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

// CREATE METHOD
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = new Customer({
    name: req.body.name,
    isVip: req.body.isVip,
    phone: req.body.phone,
  });

  try {
    const savedCustomer = await customer.save();
    res.status(201).send(savedCustomer);
  } catch (error) {
    console.log(error);
  }
});

// SHOW METHOD
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send("So'ralgan foydalanuvchi topilmadi!");
  }
  res.send(customer);
});

// UPDATE METHOD
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isVip: req.body.isVip,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer) {
    return res.status(404).send("So'ralgan foydalanuvchi topilmadi!");
  }
  res.send(customer);
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const result = await Customer.findByIdAndRemove({
    _id: req.params.id,
  });
  res.send(result);
});


module.exports = router;
