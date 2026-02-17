const Payment = require("../models/Payment");
const User = require("../models/User");

const CREDITS_PER_REPORT = 20;
const PAYMENT_PER_REPORT = 2000;

const getComputedPayout = (user) => {
  const totalReports = Number(user.totalReports || 0);
  const lastSettled = Number(user.lastSettledReportCount || 0);
  const pendingCount = Math.max(0, totalReports - lastSettled);

  return {
    pendingCount,
    credits: pendingCount * CREDITS_PER_REPORT,
    payment: pendingCount * PAYMENT_PER_REPORT,
  };
};

exports.paymentrequest = async(req,res)=>{
    try{
        const { userId, username } = req.user;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const existingrequest = await Payment.findOne({
          username,
          status: { $in: ["pending", "approved"] },
        });
        if(existingrequest){
            return res.status(400).json({ message: "Payment request already active" });
        }

        const { pendingCount, credits, payment } = getComputedPayout(user);
        if (payment <= 0) {
          return res.status(400).json({ message: "No payment due" });
        }

        const newrequest = new Payment({
            username,
            count: pendingCount,
            credits,
            payment
        });
        await newrequest.save();
        res.status(201).json({
          message: "Request Sent Successfully",
          request: newrequest,
        });
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
        if (!["approved", "cleared", "pending"].includes(status)) {
          return res.status(400).json({ error: "Invalid status value" });
        }

        const updated = await Payment.findByIdAndUpdate(
            req.params.id,{status},{new:true}
        );
        if (!updated) {
          return res.status(404).json({ error: "Payment request not found" });
        }
        res.json(updated);
    }catch(err){
         res.status(500).json({ error: "Failed to update request status" });
    }
}

exports.getMyPayment = async (req, res) => {
  try {
    const username = req.user.username;
    const userPayment = await Payment.findOne({ username }).sort({ date: -1 });
    if (!userPayment) {
      return res.status(404).json({ message: "No payment request found for this user" });
    }

    return res.json(userPayment);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch payment status" });
  }
};

exports.getPaymentStats = async (req, res) => {
  try {
    const { userId, username } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { pendingCount, credits, payment } = getComputedPayout(user);
    const latestRequest = await Payment.findOne({ username }).sort({ date: -1 });
    const latestStatus = latestRequest ? latestRequest.status : null;

    return res.json({
      count: pendingCount,
      credits,
      payment,
      latestStatus,
      hasPendingRequest: latestStatus === "pending",
      hasApprovedRequest: latestStatus === "approved",
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch payment stats" });
  }
};

exports.resetrequest = async (req, res) => {
  try {
    const { userId, username } = req.user;
    console.log("Reset request received for username:", username);

    const userrequest = await Payment.findOne({ username, status: "approved" }).sort({ date: -1 });
    console.log("User request found:", userrequest);

    if (!userrequest) {
      return res.status(404).json({ message: "No approved payment found for this user" });
    }

    userrequest.payment = 0;
    userrequest.status = "cleared";
    await userrequest.save();
    const user = await User.findById(userId);
    if (user) {
      const nextSettledCount = Math.min(
        Number(user.totalReports || 0),
        Number(user.lastSettledReportCount || 0) + Number(userrequest.count || 0)
      );
      await User.findByIdAndUpdate(userId, {
        $set: { lastSettledReportCount: nextSettledCount },
      });
    }

    res.json({ message: "Payment reset successful", userrequest });
  } catch (err) {
    console.error("Error in resetrequest:", err);
    res.status(500).json({ error: "Failed to reset payment" });
  }
};
