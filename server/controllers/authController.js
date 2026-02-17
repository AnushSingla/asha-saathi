const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const admin = require("../firebase");
const crypto = require("crypto");


exports.register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);

    const { username, email, password } = req.body;

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
    });

    console.log("New user created:", newUser);

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    console.error(" Registration error:", err);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" })
    const matchuser = await bcryptjs.compare(password, user.password)
    if (!matchuser) return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Login successful", token, username: user.username })
  } catch (err) {
    res.status(500).json({ message: "Login Failed" })
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "No token provided" });
    }

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return res.status(500).json({ message: "Authentication service not fully configured", error: error.message });
    }

    const { email, name, uid } = decodedToken;
    console.log("Google Auth attempt for:", email);

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcryptjs.hash(randomPassword, 10);

      user = await User.create({
        username: name || email.split('@')[0],
        email,
        password: hashedPassword,
      });
      console.log("New user created via Google Auth:", user.email);

      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res.status(201).json({ message: "User registered via Google", token, user });
    } else {
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res.status(200).json({ message: "Login successful", token, username: user.username });
    }

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Google Authentication failed", details: err.message });
  }
};



