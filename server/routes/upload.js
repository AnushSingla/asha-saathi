const express = require("express")
const router = express.Router();
const multer  = require('multer')
const uploadController = require("../controllers/uploadController")
const upload = multer({ dest: 'uploads/' })
router.post('/upload',upload.single('report'),uploadController.Upload)

module.exports=router;