const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

//MongoDB Compass Connection
// const dburl = "mongodb://localhost:27017/sdpproject"
// mongoose.connect(dburl).then(() => {
//     console.log("Connected to DB Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });
//MongoDb Atlas Connection
const dburl = require('dotenv').config();
mongoose.connect(dburl).then(() => {
    console.log("Connected to MongoDB Atlas Successfully")
}).catch((err) => {
    console.log(err.message)
});


const app = express() 
app.use(cors())
app.use(express.json())  //to parse the JSON data

const adminrouter = require("./routes/adminroutes")
const customerrouter = require("./routes/customerroutes")
const retailerrouter = require("./routes/retailerroutes");
const mainrouter = require("./routes/mainroutes");

app.use("",adminrouter) // to include all admin routes
app.use("",customerrouter) // to include all  customer routes
app.use("",retailerrouter) // to include all the retailer routes
app.use("",mainrouter) // to include all the main routes

const port=process.env.PORT || 2014
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
