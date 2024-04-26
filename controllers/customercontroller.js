const Customer = require("../models/Customer");
const ProductOrder = require('../models/ProductOrder');
const Product = require('../models/Product.js');

const insertcustomer = async (request, response) => {
  try 
  {
    const input = request.body;
    const customer = new Customer(input);
    await customer.save();
    response.send('Registered Successfully');
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};
const checkcustomerlogin = async (request, response) => 
{
  try
   {
    const input = request.body;
    const customer = await Customer.findOne(input);
    response.json(customer);
  } 
  catch (error)
  {
    response.status(500).send(error.message);
  }
};
const updatecustomerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const customer = await Customer.findOne({ email });
      if (!customer) 
      {
        response.status(200).send('Customer not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          customer[key] = input[key];
        }
      }
      await customer.save();
      response.status(200).send('Customer Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };
  const customerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const customer = await Customer.findOne({email})
        if(customer)
        {
          response.json(customer)
        }
        else
        {
          return response.status(200).send('Customer not found with the provided email id');
        }
        
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };
    const buyproduct = async (request, response) => {
      try {
        const input = request.body; 
        const productId = input.productId; 
        const alreadyBought = await ProductOrder.findOne({ productId }); 
    
        if (!alreadyBought) {
          const productorder = new ProductOrder(input);
          await productorder.save();
    
          const product = await Product.findById(productId);
          if (product.quantity > 0) {
            product.quantity -= 1;
            await product.save();
            response.status(200).send('Purchase Successful');
          } else {
            response.status(200).send('Product is out of stock');
          }
        } else {
          response.status(200).send('OOPS ... You have already bought this Product');
        }
      } catch(e) {
        console.error(e);
        response.status(500).send('Internal Server Error');
      }
    };
    
    const myorders = async (request, response) => 
    {
       try 
       {
         const email = request.params.email
         const myorders = await ProductOrder.find({"customerEmail":email});
         if(myorders.length==0)
         {
           response.status(200).send("DATA NOT FOUND");
         }
         else
         {
           response.json(myorders);
         }
       } 
       catch (error) 
       {
         response.status(500).send(error.message);
       }
     };

     const productbyid = async (request, response) => {
      try {
        const productId = request.params.id; // Using request instead of req
        const product = await Product.findById(productId);
        if (!product) {
          return response.status(404).send('Product not found'); 
        }
        response.json(product); 
      } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error'); // Using response instead of res
      }
    };
    const customerbyemail = async (request, response) => {
      try {
        const email = request.params.email; 
        const customer = await Customer.findOne({ email }); // Using findOne and passing email as query object
        if (!customer) {
          return response.status(404).send('Customer not found');
        }
        response.json(customer); 
      } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error'); 
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
       
    

module.exports = { insertcustomer, checkcustomerlogin, updatecustomerprofile,customerprofile,buyproduct,myorders ,productbyid,customerbyemail,myProducts};