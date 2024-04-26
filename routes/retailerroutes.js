const retailercontroller = require("../controllers/retailercontroller")

const express=require('express')
const retailerrouter = express.Router()

retailerrouter.post("/checkretailerlogin",retailercontroller.checkretailerlogin)
retailerrouter.post("/addproduct",retailercontroller.addproduct)
retailerrouter.put("/updateretailerprofile",retailercontroller.updateretailerprofile);
retailerrouter.get("/retailerprofile/:email",retailercontroller.retailerprofile)
retailerrouter.get("/viewproductorders/:email", retailercontroller.viewProductOrders);
retailerrouter.put("/updateproductorderstatus", retailercontroller.updateProductOrderStatus);
retailerrouter.get("/myproducts/:email", retailercontroller.myProducts)
retailerrouter.put('/products/:productId', retailercontroller.updateProduct);

module.exports=retailerrouter