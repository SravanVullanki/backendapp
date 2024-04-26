const maincontroller = require('../controllers/maincontroller')

const express = require("express")
const mainrouter  = express.Router()

mainrouter.get("/viewproducts",maincontroller.viewproducts)
mainrouter.post("/retailerapplicantregistration",maincontroller.retailerapplicantregistration)


module.exports = mainrouter