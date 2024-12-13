const Cadminmiddleware = async (req, res, next) => {
    if (req.user && req.user.role === "customer admin") {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = { Cadminmiddleware };