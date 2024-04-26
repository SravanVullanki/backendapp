const Customer = require("../models/Customer")
const Admin = require("../models/Admin")
const Retailer = require("../models/Retailer")
const nodemailer = require('nodemailer');
const RetailerApplicant = require('../models/RetailerApplicant');

 const viewcustomers = async (request, response) => 
 {
    try 
    {
      const customers = await Customer.find();
      if(customers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deletecustomer = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const customer = await Customer.findOne({"email":email})
      if(customer!=null)
      {
        await customer.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   const addretailer = async (request, response) => {
    try 
    {
      const input = request.body;
      const retailer = new Retailer(input);
      await retailer.save();
      response.send('Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };
  const viewretailers = async (request, response) => 
  {
     try 
     {
       const retailers = await Retailer.find();
       if(retailers.length==0)
       {
         response.send("DATA NOT FOUND");
       }
       else
       {
         response.json(retailers);
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   const deleteretailer = async (request, response) => 
 {
    try 
    {
      const uname = request.params.username
      const retailer = await Retailer.findOne({"username":uname})
      if(retailer!=null)
      {
        await Retailer.deleteOne({"username":uname})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Username Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const viewretailerapplicants = async (request, response) => {
    try {
      
        const retailerApplicants = await RetailerApplicant.find();

        if (retailerApplicants.length === 0) {
            return response.status(200).send("No retailer applicants found");
        } else {
            response.json(retailerApplicants);
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mikemarcus1201@gmail.com', 
        pass: 'dtfqkxdiiqnhcqhc' 
    }
});

const sendEmailSuccess = (recipient, username, password) => {
  const mailOptions = {
      from: '"Paws And Palace" <mikemarcus1201@gmail.com>',
      to: recipient,
      subject: 'Congratulations on Your Retailer Application',
      text: `Hello,\n\nYour retailer application has been accepted. Your username is: ${username} and your password is: ${password}. We recommend you to please change the password for security reasons by going to the profile section in the navigation bar and updating your profile. Congratulations!\n\nBest regards,\nPaws And Palace`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
};

const sendEmailRejection = (recipient, message) => {
  const mailOptions = {
      from: '"Paws And Palace" <mikemarcus1201@gmail.com>',
      to: recipient,
      subject: 'Regarding Your Retailer Application',
      text: `Hello,\n\nWe regret to inform you that your retailer application has been rejected. ${message}.\n\nBest regards,\nPaws And Palace`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
};

const changeretailerstatus = async (request, response) => {
  try {
    const { email, status, rejectionMessage } = request.body;

    if (!email || !status) {
      return response.status(400).send('Email and status are required');
    }

    const updatedApplicant = await RetailerApplicant.findOneAndUpdate(
      { email: email },
      { $set: { status: status, rejectionMessage: rejectionMessage } }, // Include rejection message in update
      { new: true }
    );

    if (!updatedApplicant) {
      return response.status(404).send('Retailer applicant not found');
    }

    if (status === 'accepted') {
      const newRetailer = new Retailer({
        fullname: updatedApplicant.fullname,
        gender: updatedApplicant.gender,
        dateofbirth: updatedApplicant.dateofbirth,
        company: updatedApplicant.company,
        username: updatedApplicant.username,
        email: updatedApplicant.email,
        password: updatedApplicant.password,
        address: updatedApplicant.address,
        contact: updatedApplicant.contact,
      });

      await newRetailer.save();

      sendEmailSuccess(updatedApplicant.email, updatedApplicant.username, updatedApplicant.password);
    } else if (status === 'rejected') {
      sendEmailRejection(updatedApplicant.email, rejectionMessage); // Pass rejection message to sendEmailRejection
    }

    response.status(200).send('Retailer Status Updated Successfully');
  } catch (error) {
    console.error('Error updating retailer status:', error);
    response.status(500).send(error.message);
  }
};



  module.exports = {viewcustomers,deletecustomer,checkadminlogin,addretailer,viewretailers,deleteretailer,viewretailerapplicants,changeretailerstatus}