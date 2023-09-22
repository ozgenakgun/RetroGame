// handles registering users, addings users etc.

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); // fetches google account avatar
const bcrypt = require('bcryptjs'); // for hashing the password for extra protection
const jwt = require('jsonwebtoken'); // web tokens are used for accessing protected pages
const config = require('config'); // to access environment variables
const {check, validationResult} = require('express-validator'); // required for validation during registery
const auth = require('../../middleware/auth'); // to make use of auth middleware, just add it before (req, res) ex: '/' , auth, (req, res) =>...


const User = require('../../models/User'); // get the user model for DB

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User Route'));

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [ // this list of checks come from express-validator imported on line 5
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('studentID', 'Please enter a valid student ID Number').isNumeric().isLength({ min: 9, max: 9}),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // if there are errors
            return res.status(400).json({ errors: errors.array() }); // 400 - bad request
        }

        const {name, email, studentID, password} = req.body;

        try {
            // See if user exists
            let userEmail = await User.findOne({ email });
            let userID = await User.findOne({ studentID });
            if (userEmail || userID) { // if a user is found with inputted email or studentID
                return res.status(400).json({ errors: [  { msg: 'User already exists' }] });
            }

            // Get users gravatar (based on email)
            const avatar = gravatar.url(email, {
                s: '200', // size
                r: 'pg', // rating: pg so no inappropriate images
                d: 'mm' // if no avatar found use default
            });

            // create an instance of a user
            let user = new User({
                name,
                email,
                studentID,
                avatar,
                password
            });

            // Encrypt Password
            const salt = await bcrypt.genSalt(10); // used to hash the password
            user.password = await bcrypt.hash(password, salt);

            // Save user to database
            await user.save();

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

// @route   POST api/users/password
// @desc    Change Password
// @access  Private
router.post('/password', [auth, // this list of checks come from express-validator imported on line 5
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // if there are errors
            return res.status(400).json({ errors: errors.array() }); // 400 - bad request
        }

        const {password} = req.body;

        try {
            // See if user exists
            let userToModify = await User.findOne({ _id: req.user.id });
            if (!userToModify) { // if no user is found with
                return res.status(400).json({ errors: [  { msg: 'User not found exists' }] });
            }

            let modifiedUser = userToModify;

            // Encrypt Password
            const salt = await bcrypt.genSalt(10); // used to hash the password
            modifiedUser.password = await bcrypt.hash(password, salt);

            // Save user to database
            modifiedUser = await User.findOneAndUpdate(
                { _id: req.user.id},
                { $set: modifiedUser},
                { new: true }
            );

            const payload = {
                user: {
                    id: modifiedUser.id // this is the automatically generated ID number in MongoDB
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

// @route   DELETE api/users
// @desc    DELETE User, Tasks table and Pet
// @access  Private
router.delete('/', auth, async (req,res) => {
    try {
        // remove all tables belonging to the user
        await User.findOneAndRemove({ _id: req.user.id });
        await Tasks.findOneAndRemove({ user: req.user.id });
        await Pet.findOneAndRemove({ user: req.user.id });

        res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;