// Google authentication controller
exports.googleAuth = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ message: "Missing idToken" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decodedToken;
    if (!email) {
      return res.status(400).json({ message: "Google account must have an email" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      // Create a random password for new users
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcryptjs.hash(randomPassword, 10);
      user = await User.create({
        username: name || email.split('@')[0],
        email,
        password: hashedPassword,
        role: "user",
      });
    }
    
    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ error: "Server configuration error: JWT_SECRET not set" });
    }
    
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json({ 
      message: "Google authentication successful", 
      token, 
      user: { username: user.username },
      role: user.role 
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ message: "Invalid Google token", error: err.message });
  }
};
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const admin = require("../firebase");
const crypto = require("crypto");


exports.register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);

    const { username, email, password, role, adminSecret } = req.body;
    const requestedRole = role === "admin" ? "admin" : "user";

    if (requestedRole === "admin") {
      if (!process.env.ADMIN_SECRET || adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Invalid admin registration secret" });
      }
    }

    // Server-side strong password validation
    const passwordErrors = [];
    if (!password || password.length < 8) passwordErrors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) passwordErrors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) passwordErrors.push("one lowercase letter");
    if (!/[0-9]/.test(password)) passwordErrors.push("one number");
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) passwordErrors.push("one special character");
    if (passwordErrors.length > 0) {
      return res.status(400).json({ message: `Password must contain: ${passwordErrors.join(", ")}` });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: requestedRole,
    });

    console.log("New user created:", newUser);

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ error: "Server configuration error: JWT_SECRET not set" });
    }
    
    const userRole = newUser.role || "user";
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "User registered",
      token,
      role: userRole,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: userRole,
      },
    });
  } catch (err) {
    console.error(" Registration error:", err);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};


exports.login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User doesn't exist"})
        const matchuser = await bcryptjs.compare(password,user.password)
        if(!matchuser) return res.status(401).json({message:"Invalid Credentials"});
        const userRole = user.role || "user";

        const token = jwt.sign({userId:user._id,username:user.username, role: userRole},process.env.JWT_SECRET,{
            expiresIn : "2h",
        });
        res.json({message:"Login successful",token,username:user.username, role: userRole})
    }catch(err){
        res.status(500).json({message:"Login Failed"})
    }
}
