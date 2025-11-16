const Payment = require("../models/Payment");
exports.paymentrequest = async(req,res)=>{
    try{
        const {username,count,credits,payment} = req.body;
        const existingrequest = await Payment.findOne({username, status:"pending"})
        if(existingrequest){
            return res.status(400).json({ message: "Request already sent!" });
        }
        const newrequest = new Payment({
            username,
            count,
            credits,
            payment
        });
        await newrequest.save();
        res.status(201).json({message: "Request Sent Successfully",request:newrequest});
    }catch(err){
         res.status(500).json({ error: "Failed to create payment request" });
    }
}

exports.getrequest = async(req,res)=>{
    try{
        const requests = await Payment.find().sort({date:-1});
        res.json(requests);
    }catch(err){
        res.status(500).json({message:"No Request made"});
    }
}

exports.resultrequest = async(req,res)=>{
    try{
        const {status} = req.body;
        const updated = await Payment.findByIdAndUpdate(
            req.params.id,{status},{new:true}
        );
        res.json(updated);
    }catch(err){
         res.status(500).json({ error: "Failed to update request status" });
    }
}

exports.resetrequest = async (req, res) => {
  try {
    const { username } = req.body;
    console.log("Reset request received for username:", username);

    const userrequest = await Payment.findOne({ username, status: "approved" });
    console.log("User request found:", userrequest);

    if (!userrequest) {
      return res.status(404).json({ message: "No approved payment found for this user" });
    }

    userrequest.payment = 0;
    userrequest.status = "cleared";
    await userrequest.save();

    res.json({ message: "Payment reset successful", userrequest });
  } catch (err) {
    console.error("Error in resetrequest:", err);
    res.status(500).json({ error: "Failed to reset payment" });
  }
};
