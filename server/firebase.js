const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Firebase Admin SDK
// You should set FIREBASE_SERVICE_ACCOUNT_KEY in your .env file
// It can be a path to the file or the JSON content string
let serviceAccount;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        // Check if it's a JSON string or a path
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim().startsWith('{')) {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        } else {
            serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("Firebase Admin initialized successfully");
    } else {
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set in .env. Firebase Admin not initialized.");
    }
} catch (error) {
    console.error("Error initializing Firebase Admin:", error);
}

module.exports = admin;
