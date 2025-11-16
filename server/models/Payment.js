const mongoose = require("mongoose")
const PaymentScehma = new mongoose.Schema({
    
  username: { type: String, required: true },
  count: { type: Number, required: true },
  credits: { type: Number, required: true },
  payment: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum:["pending","approved","cleared"], default: "pending" }
})
module.exports = mongoose.model("Payment",PaymentScehma)