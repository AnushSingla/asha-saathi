const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/uploadController");
const { verifyToken } = require("../middleware/authMiddleware");

const supportedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (supportedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error("Unsupported file type. Please upload a JPG, PNG, or WEBP image.")
    );
  },
});

const handleUpload = (req, res, next) => {
  upload.single("report")(req, res, (err) => {
    if (!err) {
      return next();
    }

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(400).json({ error: err.message || "Invalid file upload" });
  });
};

router.post("/upload", verifyToken, handleUpload, uploadController.Upload);

module.exports = router;
