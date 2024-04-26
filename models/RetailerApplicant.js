const mongoose = require("mongoose")

const retailerapplicantschema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
    dateofbirth: {
      type: String,
      required: true
    },
    company: {
        type: String,
        required: true
      },
    username: {
        type: String,
        required: true,
        unique:true
      },  
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      default:"pnp123"
    },
    address: {
      type: String,
      required: true 
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
      status: {
        type: String,
        required: true,
        default:"applied"
      },
  });

const retailerapplicant = mongoose.model('retailerapplicant', retailerapplicantschema);

module.exports = retailerapplicant;