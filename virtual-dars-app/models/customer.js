const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  isVip: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const categorySchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    isVip: Joi.boolean().required(),
    phone: Joi.string().required().min(3).max(50),
  });
  return categorySchema.validate(customer);
}

exports.validate = validateCustomer;
exports.Customer = Customer;
