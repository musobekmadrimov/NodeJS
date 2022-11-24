const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
  });
  
  const Category = new mongoose.model("category", categorySchema);


  function validateCategory(category) {
    const categorySchema = Joi.object({
      name: Joi.string().required().min(3),
    });
    return categorySchema.validate(category);
  }


  exports.Category = Category;
  exports.validate = validateCategory;
