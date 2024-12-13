const Sadminmiddleware = async (req, res, next) => {
    if (req.user && req.user.role === "supplier admin") {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = { Sadminmiddleware };