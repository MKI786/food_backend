const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // If no token is present, respond with a 401 status
            if (!token) {
                return res.status(401).json({ message: 'Not authorized, no token' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach the decoded user info to the request object
            req.user = decoded;

            next();
        } catch (error) {
            // Check if the error is a JWT Token expiration error
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired. Please login again.' });
            } 
            // Check if the error is due to a malformed JWT
            else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token. Please login again.' });
            } 
            // Handle any other unexpected errors
            else {
                console.error('Unexpected error:', error);
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
        }
    }

    // If no token is provided, respond with a 401 status
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
