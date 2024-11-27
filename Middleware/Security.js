const jwt = require('jsonwebtoken');
const validatetoken=async(req,res)=>{
    try {
        const token = req.header('x-token');
        if (!token) {
            return res.status(400).send("Token not found");
        }

        const decode = jwt.verify(token, 'jwtSecret');
        console.log('Decoded Token:', decode);
        
        req.user = decode.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}
const validaterole = (allowedroles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: "User not authenticated" });
        }
        if (!allowedroles.includes(req.user.Role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
}
module.exports={validatetoken,validaterole};