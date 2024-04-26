const Retailer = require("../models/Retailer")
const Product = require("../models/Product")
const Customer = require("../models/Customer.js")
const ProductOrder = require("../models/ProductOrder.js")
const nodemailer = require('nodemailer');
const axios = require('axios')

const  checkretailerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const retailer = await Retailer.findOne(input)
     response.json(retailer)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };
 const addproduct = async (request, response) => {
  try 
  {
    const input = request.body;
    const product = new Product(input);
    await product.save();
    response.send('Product Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};
const updateretailerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const retailer = await Retailer.findOne({ email });
      if (!retailer) 
      {
        response.status(200).send('Retailer not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          retailer[key] = input[key];
        }
      }
      await retailer.save();
      response.status(200).send('Retailer Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };
  const retailerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const retailer = await Retailer.findOne({email})
        if(retailer)
        {
          response.json(retailer)
        }
        else
        {
          return response.status(200).send('Retailer not found with the provided email id');
        }
        
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };
    const viewProductOrders = async (request, response) => {
      try {
        const remail = request.params.email;
    
        // Retrieve all product orders
        const productOrders = await ProductOrder.find({});
    
        // Extract product IDs from product orders
        const productIds = productOrders.map(order => order.productId);
    
        // Retrieve products corresponding to the product IDs and company
        const products = await Product.find({
          _id: { $in: productIds },
          company: remail
        });
    
        // Initialize an empty array to store the matched product order objects
        let matchedOrders = [];
    
        // Loop through each product to find the matching orders
        products.forEach(product => {
          // Find orders matching the product's productId
          const orders = productOrders.filter(order => order.productId.toString() === product._id.toString());
          // Add the matching orders to the matchedOrders array
          matchedOrders = matchedOrders.concat(orders);
        });
    
        if (matchedOrders.length === 0) {
          return response.status(200).send("No matching product orders found for this retailer");
        } else {
          return response.status(200).json(matchedOrders);
        }
      } catch (error) {
        response.status(500).send(error.message);
      }
    };
    
    
    const updateProductOrderStatus = async (request, response) => {
      try {
        const { orderId, status } = request.body;
    
        if (!orderId || !status) {
          return response.status(400).send('Order ID and status are required');
        }
    
        const updatedOrder = await ProductOrder.findOneAndUpdate(
          { orderId },
          { $set: { status } },
          { new: true }
        );
    
        const productResponse = await axios.get(`${config.url}/productbyid/${updatedOrder.productId}`);
        const productName = productResponse.data.name;
    
        // Send email to the customer with the updated status and product name
        sendEmail(updatedOrder.customerEmail, status, productName);
    
        response.status(200).json(updatedOrder);
      } catch (error) {
        console.error('Error updating product order status:', error);
        response.status(500).send(error.message);
      }
    };
    const sendEmail = (recipient, status, productName) => {
      try {
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'mikemarcus1201@gmail.com',
            pass: 'dtfqkxdiiqnhcqhc'
          }
        });
        const mailOptions = {
          from: '"Paws And Palace" <mikemarcus1201@gmail.com>',
          to: recipient,
          subject: 'Your Order Status has been Changed',
          text: `Hello,\n\nYour Order for ${productName} has been Changed to: ${status}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            throw error;
          } else {
            console.log('Email sent:', info.response);
          }
        });
      } catch (error) {
        console.error('Error in sendEmail function:', error);
        throw error;
      }
    };
    const myProducts = async (request, response) => {
      try {
        const email = request.params.email;
        const products = await Product.find({ company: email });
        if (!products || products.length === 0) {
          return response.status(404).send('No products found for this user');
        }
        response.json(products);
      } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
      }
    };
    
    const updateProduct = async (request, response) => {
      try {
        const input = request.body;
        const productId = input._id;
        const product = await Product.findById(productId);
        if (!product) {
          return response.status(404).send('Product not found with the provided productId');
        }
        for (const key in input) {
          if (key !== 'productId' && input[key]) {
            product[key] = input[key];
          }
        }
        await product.save();
        response.status(200).send('Product Updated Successfully');
      } catch (e) {
        response.status(500).send(e.message);
      }
    };
    
  
  
    
 module.exports = {checkretailerlogin,addproduct,updateretailerprofile,retailerprofile,viewProductOrders, updateProductOrderStatus,myProducts,updateProduct}