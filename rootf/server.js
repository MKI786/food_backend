const express = require('express')
const Dotenv = require('dotenv')
const cors= require('cors');
const bodyParser = require('body-parser');
const app = express();
const { dbconnect }  = require('./Config/Db');
const multer = require('multer'); 
const fs = require('fs');
const path = require('path');



// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true }); // Recursively create 'uploads/' directory
}

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, './uploads')));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath); // Set absolute path for uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Correctly handle file extension
  }
});

const upload = multer({ storage: storage });


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


Dotenv.config();
dbconnect();

//routes
app.use('/api/auth', require('./Routes/AuthRoutes'));


const port = 5000;
app.listen( port , ()=>{
    console.log("server is running on Port " + port)
})
