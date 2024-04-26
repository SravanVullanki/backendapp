const Product = require("../models/Product")
const Retailer = require("../models/Retailer")
const RetailerApplicant = require("../models/RetailerApplicant")
const viewproducts = async (request, response) => 
 {
    try 
    {
      const products = await Product.find();
      if(products.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(products);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const retailerapplicantregistration = async (request, response) => {
    try {
        const inputData = request.body;

        // Check if email, phone number, and username already exist
        const existingEmail = await Retailer.findOne({ email: inputData.email });
        const existingPhoneNumber = await Retailer.findOne({ contact: inputData.contact });
        const existingUsername = await Retailer.findOne({ username: inputData.username });

        if (existingEmail || existingPhoneNumber || existingUsername) {
            let message = '';
            if (existingEmail) {
                message += 'Retailer with this email already exists. ';
            }
            if (existingPhoneNumber) {
                message += 'Retailer with this phone number already exists. ';
            }
            if (existingUsername) {
                message += 'Retailer with this username already exists.';
            }
            response.status(200).send(message);
        } else {
            const newRetailer = new RetailerApplicant(inputData);
            await newRetailer.save();
            response.status(200).send('Retailer registration successful. Further details will be sent to your email.');
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

module.exports = retailerapplicantregistration;

  module.exports = {viewproducts,retailerapplicantregistration}