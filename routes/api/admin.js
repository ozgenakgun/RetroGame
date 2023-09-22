// Operations related admins

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); // fetches google account avatar
const bcrypt = require('bcryptjs'); // for hashing the password for extra protection
const jwt = require('jsonwebtoken'); // web tokens are used for accessing protected pages
const config = require('config'); // to access environment variables
const {check, validationResult} = require('express-validator'); // required for validation during registery
const auth = require('../../middleware/auth'); // to make use of auth middleware, just add it before (req, res) ex: '/' , auth, (req, res) =>...


const Admin = require('../../models/Admin'); // get the admin model for DB

// @route   GET api/admin
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Admin Route'));

// @route   POST api/admin
// @desc    Register Admin
// @access  Public
router.post('/', [ // this list of checks come from express-validator imported on line 5
    auth,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('adminID', 'Please enter a valid admin ID Number').isNumeric().isLength({ min: 9, max: 9}),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
    ], 
    async (req, res) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // if there are errors
            return res.status(400).json({ errors: errors.array() }); // 400 - bad request
        }

        // find id from token, check if id belongs to an admin (found in Admin DB model) !!!!!!! NOT WORKING
        let existingAdmin = await Admin.findById(req.user.id);
        if (!existingAdmin) {
            return res.status(400).json({ errors: [  { msg: 'You have to be an admin to register additional admins' }] });
        }

        const {name, email, adminID, password} = req.body;

        try {
            // See if admin exists
            let userEmail = await Admin.findOne({ email });
            let userID = await Admin.findOne({ adminID });
            if (userEmail || userID) { // if a admin is found with inputted email or adminID
                return res.status(400).json({ errors: [  { msg: 'Admin already exists' }] });
            }

            // Get admins gravatar (based on email)
            const avatar = gravatar.url(email, {
                s: '200', // size
                r: 'pg', // rating: pg so no inappropriate images
                d: 'mm' // if no avatar found use default
            });

            // create an instance of a admin
            let user = new Admin({
                name,
                email,
                adminID,
                avatar,
                password
            });

            // Encrypt Password
            const salt = await bcrypt.genSalt(10); // used to hash the password
            user.password = await bcrypt.hash(password, salt);

            // Save admin to database
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

// @route   DELETE api/admin
// @desc    DELETE admin, Tasks table and Pet
// @access  Private
router.delete('/', auth, async (req,res) => {
    var numAdmin = await Admin.countDocuments();

    //console.log(numAdmin);
    if(numAdmin == 1) {
        return res.status(400).json({ errors: [  { msg: 'Cannot delete final admin' }] });
    }
    try {
        // remove all tables belonging to the admin
        await Admin.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'Admin Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;