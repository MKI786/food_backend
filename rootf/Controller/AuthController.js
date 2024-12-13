const  Admin_a  = require('../Models/Admin') 
const jwt = require('jsonwebtoken');
const multer = require('multer'); 
const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); 
const Report_a = require('../Models/Report')



// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true }); // Recursively create 'uploads/' directory
}
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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




  
// Register controller function
const register = async (req, res) => {
    try {
      const { name, email, password, role, phone } = req.body;
  
      // Check if admin is already registered
      const already = await Admin_a.findOne({ email: email });
      if (already) {
        return res.json({ message: "Admin is already registered", token: already.token });
      }
      

      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      // Create new admin object
      const au = new Admin_a({
        name: name,
        email: email,
        password: password,
        role: role,
        phone: phone,
        profilepicture: imagePath
      });
  
      // Save admin to the database
      const s = await au.save();
      if (!s) {
        return res.json({ message: "NOT registered correctly" });
      }
  
      res.json({ message: "Admin registered successfully", profilepicture: imagePath });
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ message: "Server error occurred", error: error.message });
    }
  };



    const gettoken_cadmin = (id, role) => {
        return jwt.sign({id, role}, process.env.JWT_SECRET);
        }

    const gettoken_sadmin = (id, role) => {
        return jwt.sign({id, role}, process.env.JWT_SECRET);
        }

        
        
        //login endpoint
        const login = async(req, res) =>{
        const {email, password} = req.body;
        const su = await Admin_a.findOne({email});
        if(su)
        {
            if(su.password === password)
            {
                if(su.role==="customer admin")
                {
                    res.json({
                        id:su._id,
                        email: su.email,
                        password: su.password,
                        token: gettoken_cadmin(su._id, su.role),
                        message:"Login successful",
                        status:"customer admin logged in successfuly"
                     })
                }
        
                if(su.role==="supplier admin")
                {
                    res.json({
                        id:su._id,
                        email: su.email,
                        password: su.password,
                        token: gettoken_sadmin(su._id, su.role),
                        message:"Login successful",
                        status:"supplier admin logged in successfuly"
                     })
                }
             
            }

            if(su.password !== password)
            {
               return  res.status(401).json({message: "invalid credentials"});
            }
        }
        
        if(!su)
        {
            return  res.status(401).json({message: "invalid credentials"});
        }
        }




        const verifyauth = async (req, res) =>{

const role = req.user.role;

const aid = req.user.id;

const admin = await Admin_a.findById(aid)

if(admin)
{

    
res.json({ rolea: role, admin: admin });

}
else
{
    res.status(401).json({message:"Unauthorized User"})
}
}




const getsuppliers = async (req, res)=>{
    const suppliers = await mongoose.connection.collection('suppliers').find().toArray();
 if(suppliers.length>0)
 {
    res.json({suppliera: suppliers});
 }
 else
 {
    res.status(401).json({message:"Unable to fetch suppliers"});
 }
}



const  getproducts= async( req,res)=>{

  const product = await mongoose.connection.collection('products').find().toArray();
  if(product.length>0)
  {
     res.json({pro: product});
  }
  else
  {
     res.status(401).json({message:"Unable to fetch Products"});
  }
}



const setsupplierstatus = async (req, res) => {
  try {
    const { sid, status } = req.body;



    // Step 1: Check if sid is provided
    if (!sid) {
      return res.status(400).json({ message: 'SID is required' });
    }

    // Step 2: Convert sid to ObjectId (only if sid is an ObjectId in the database)
    let objectId;
    try {
      objectId = new ObjectId(sid); // Convert sid to ObjectId
    } catch (error) {
      return res.status(400).json({ message: 'Invalid SID format' });
    }

    // Step 3: Check if supplier exists
    const currentSupplier = await mongoose.connection.collection('suppliers').findOne({ _id: objectId });
    if (!currentSupplier) {
      console.log("No supplier found for sid:", sid);
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Step 4: Update the supplier's businessVerification.isVerified to true
    const updatedSupplier = await mongoose.connection.collection('suppliers').findOneAndUpdate(
      { _id: objectId }, // Use ObjectId to query _id
      { $set: { "businessVerification.isVerified": status } }, 
      { returnDocument: "after" }
    );

    // Step 5: Respond with the updated supplier
    if (updatedSupplier) {
      res.json({ suppliera: updatedSupplier});
    } else {
      res.status(404).json({ message: 'Supplier not updated' });
    }

  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};






const setproductstatus= async(req, res)=>{
  try {
    const { pid, pstatus } = req.body;

    // Step 1: Check if sid is provided
    if (!pid) {
      return res.status(400).json({ message: 'pID is required' });
    }

    // Step 2: Convert sid to ObjectId (only if sid is an ObjectId in the database)
    let objectId;
    try {
      objectId = new ObjectId(pid); // Convert sid to ObjectId
    } catch (error) {
      return res.status(400).json({ message: 'Invalid SID format' });
    }

    // Step 3: Check if supplier exists
    const currentSupplier = await mongoose.connection.collection('products').findOne({ _id: objectId });
    if (!currentSupplier) {
      console.log("No Product found for sid:", sid);
      return res.status(404).json({ message: 'product not found' });
    }


    const updatedSupplier = await mongoose.connection.collection('products').findOneAndUpdate(
      { _id: objectId }, // Filter using ObjectId
      { $set: { status: pstatus } }, // Use $set operator to update fields
      { returnDocument: "after" } // Return the updated document
    );
    

    // Step 5: Respond with the updated supplier
    if (updatedSupplier) {
      res.json({ pro: updatedSupplier});
    } else {
      res.status(404).json({ message: 'product not updated' });
    }

  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const generatereport= async(req, res)=>{
  const aid = req.user.id;
  const {reportType, filters, reportData } = req.body;
  const report = await new Report_a({
    reportType:reportType,
    filters:filters,
    generatedBy:aid,
    reportData:reportData
  });

  const r =  await report.save();
  if(r)
  {
    res.json({message:"Report generated successfuly"})
  }
  else
  {
    res.status(401).json({message:"Failed to Generate report"})
  }
}





const getpromotions = async (req, res) => {
  try {
    const suppliers = await mongoose.connection.collection('promotions').find().toArray(); // ✅ Convert cursor to array
    if (suppliers) {
      res.json({ prom: suppliers }); // ✅ Send the plain array of documents
    } else {
      res.status(401).json({ message: "Unable to fetch Promotions" });
    }
  } catch (error) {
    console.error('Error fetching promotions:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




const getticket =async (req, res)=>{
  const suppliers = await mongoose.connection.collection('supporttickets').find().toArray();
  if(suppliers.length>0)
  {
     res.json({ticket: suppliers});
  }
  else
  {
     res.status(401).json({message:"Unable to fetch Support ticket"});
  }
}


const getnotification= async(req, res)=>{
  const suppliers = await mongoose.connection.collection('notifications').find().toArray();
  if(suppliers.length>0)
  {
     res.json({noti: suppliers});
  }
  else
  {
     res.status(401).json({message:"Unable to fetch notification"});
  }
}



module.exports = {
  register,
  upload ,
  login,
  verifyauth,
  getsuppliers,
  setsupplierstatus,
  getproducts,
  setproductstatus,
  generatereport,
  getpromotions,
  getticket,
  getnotification
}