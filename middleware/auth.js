// middleware function for getting the token from request header
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); // decodes the token
        req.user = decoded.user; // get the user ID from the decoded token
        next(); // this is always required in middlewares so operation continues to next middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};