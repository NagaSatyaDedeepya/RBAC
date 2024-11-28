const jwt = require('jsonwebtoken');

// Token validation middleware
const validatetoken = async (req, res, next) => {
    try {
        const token = req.header('x-token');
        if (!token) {
            return res.status(400).send("Token not found");
        }

        const decode = jwt.verify(token, 'jwtSecret');  // Use the same 'jwtSecret'
        console.log('Decoded Token:', decode);
        
        req.user = decode.user; 
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
};

// Role validation middleware
const validaterole = (allowedroles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: "User not authenticated" });
        }
        if (!allowedroles.includes(req.user.Role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next(); // Proceed to the next middleware or route handler
    };
};

module.exports = { validatetoken, validaterole };
