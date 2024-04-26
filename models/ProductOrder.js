const mongoose = require('mongoose');
const moment = require('moment-timezone');

const productorderschema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        default: () => generateRandomOrderId()
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ordered"
    },
    orderTime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    }
});

const productorder = mongoose.model('productorder', productorderschema);

function generateRandomOrderId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "O" + randomNumber;
}

module.exports = productorder;
