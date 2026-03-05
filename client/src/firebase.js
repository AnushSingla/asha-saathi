import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const REQUIRED_ENV_VARS = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missingVars = Object.entries(REQUIRED_ENV_VARS)
  .filter(([, value]) => !value)
  .map(([key]) => `VITE_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`);

let auth = null;
let googleProvider = null;

if (missingVars.length > 0) {
  console.warn(
    "[Firebase] Initialization skipped. The following environment variables are missing:\n" +
      missingVars.map((v) => `  - ${v}`).join("\n") +
      "\n  Firebase-dependent features (login, auth) will be unavailable."
  );
} else {
  try {
    const app = initializeApp(REQUIRED_ENV_VARS);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error("[Firebase] Failed to initialize:", error.message);
  }
}

export { auth, googleProvider };
