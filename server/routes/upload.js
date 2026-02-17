const express = require("express")
const router = express.Router();
const multer  = require('multer')
const uploadController = require("../controllers/uploadController")
const { verifyToken } = require("../middleware/authMiddleware");
const upload = multer({ dest: 'uploads/' })
router.post('/upload', verifyToken, upload.single('report'), uploadController.Upload)

module.exports=router;
