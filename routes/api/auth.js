// authentication

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // to make use of auth middleware, just add it before (req, res) ex: '/' , auth, (req, res) =>...
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs'); // for hashing the password for extra protection
const jwt = require('jsonwebtoken'); // web tokens are used for accessing protected pages
const config = require('config'); // to access environment variables
const {check, validationResult} = require('express-validator'); // required for validation during registery

// @route   GET api/auth
// @desc    Get user information by providing token
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // the middleware changed req.user.id to decoded id
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/auth/admin
// @desc    Get admin information by providing token
// @access  Private
router.get('/admin', auth, async (req, res) => {
    try {
        const user = await Admin.findById(req.user.id); // the middleware changed req.user.id to decoded id
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate User & get token
// @access  Public
router.post('/', [ // this list of checks come from express-validator imported on line 5
    check('studentID', 'Student ID is required').exists(),
    check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // if there are errors
            return res.status(400).json({ errors: errors.array() }); // 400 - bad request
        }

        const {studentID, password} = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ studentID });
            if (!user) { // if there is no such user
                return res.status(400).json({ errors: [  { msg: 'Invalid Credentials' }] });
            }

            // check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [  { msg: 'Invalid Credentials' }] });
            }

            // Return JsonWebToken (JWT is used for accessing protected pages that require a password)
            const payload = {
                user: {
                    id: user.id // this is the automatically generated ID number in MongoDB
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: config.get('expiration') },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
                });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route   POST api/auth/admin
// @desc    Authenticate Admin & get token
// @access  Public
router.post('/admin', [ // this list of checks come from express-validator imported on line 5
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // if there are errors
            return res.status(400).json({ errors: errors.array() }); // 400 - bad request
        }

        const {email, password} = req.body;

        try {
            // See if admin exists
            let user = await Admin.findOne({ email });
            if (!user) { // if there is no such admin
                return res.status(400).json({ errors: [  { msg: 'Invalid Credentials' }] });
            }

            // check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [  { msg: 'Invalid Credentials' }] });
            }

            // Return JsonWebToken (JWT is used for accessing protected pages that require a password)
            const payload = {
                user: {
                    id: user.id // this is the automatically generated ID number in MongoDB
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: config.get('expiration') },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
                });

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

module.exports = router;