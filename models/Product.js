const mongoose = require("mongoose")

const productschema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true,
      enum: ['Belts', 'Food', 'Medicines', 'Pets(PreOwned)', 'Pets(NewlyBorn)', 'Toys', 'Treats', 'Others']
    },
    company: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
    }
  });

const product = mongoose.model('product', productschema);

module.exports = product;