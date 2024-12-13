const Nuetralmiddleware = async (req, res, next) => {
    if (req.user && (req.user.role === "customer admin" || req.user.role === "supplier admin")) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = { Nuetralmiddleware };