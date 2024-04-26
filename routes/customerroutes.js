const customercontroller = require("../controllers/customercontroller");
const express = require("express");
const customerrouter = express.Router();

customerrouter.post("/insertcustomer", customercontroller.insertcustomer);
customerrouter.post("/checkcustomerlogin", customercontroller.checkcustomerlogin);
customerrouter.put("/updatecustomerprofile",customercontroller.updatecustomerprofile);
customerrouter.get("/customerprofile/:email",customercontroller.customerprofile)
customerrouter.post("/buyproduct",customercontroller.buyproduct)
customerrouter.get("/myorders/:email",customercontroller.myorders)
customerrouter.get("/productbyid/:id", customercontroller.productbyid);
customerrouter.get("/customerbyemail/:email", customercontroller.customerbyemail);
customerrouter.get("/myproducts/:email",customercontroller.myProducts)

module.exports = customerrouter;
