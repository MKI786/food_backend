const express = require('express');
const router =  express.Router();

const {
    register,
    login,
    upload,
    verifyauth,
    getsuppliers,
    setsupplierstatus,
    getproducts,
    setproductstatus,
    generatereport,
    getpromotions,
    getticket,
    getnotification
} = require('../Controller/AuthController');

const { protect } = require('../Middleware/Authmiddleware');
const { Cadminmiddleware } = require('../Middleware/Cadminmiddleware');
const { Sadminmiddleware } = require('../Middleware/Sadminmiddleware');
const { Nuetralmiddleware } = require('../Middleware/Nuetralmiddleware');


router.post('/register', upload.single('profilepicture'), register);
router.post('/login' , login);
router.get('/verifyauth', protect, Nuetralmiddleware, verifyauth );

//supplier api endpoints
router.get('/getsuppliers', protect, Sadminmiddleware, getsuppliers)
router.post('/setsupplierstatus', setsupplierstatus);
router.get('/getsproducts', protect, Sadminmiddleware, getproducts)
router.post('/setproductstatus', setproductstatus);

router.post('/generatereport', protect, Nuetralmiddleware, generatereport);
router.get('/getpromotions', protect, Nuetralmiddleware, getpromotions);
router.get('/getticket', protect, Nuetralmiddleware, getticket);
router.get('/getnotification', protect, Nuetralmiddleware, getnotification);


module.exports = router;
