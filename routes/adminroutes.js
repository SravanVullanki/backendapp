//admin routes
const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()


adminrouter.get("/viewcustomers",admincontroller.viewcustomers)
adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)


adminrouter.post("/addretailer",admincontroller.addretailer)
adminrouter.get("/viewretailers",admincontroller.viewretailers)
adminrouter.delete("/deleteretailer/:username",admincontroller.deleteretailer)

adminrouter.get("/viewretailerapplicants",admincontroller.viewretailerapplicants)
adminrouter.post("/changeretailerstatus",admincontroller.changeretailerstatus)
module.exports = adminrouter

