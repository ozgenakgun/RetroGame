// Operations related to the pet such as browsing options, and changing options to modify look of pet
// commands to feed the pet and play with it can be here too

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // any request with auth as 2nd param will be private
const Pet = require('../../models/Pet');
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const tasksJson = require('../../tasks/tasks.json');
const {check, validationResult} = require('express-validator');

// @route   GET api/pet
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Pet Route'));


// @route   POST api/pet
// @desc    Create a pet object in the DB
// @access  Private
router.post('/', auth, async (req, res) => {
    // Build Tasks
    const pet = {};
    pet.user = req.user.id; // set the user to be the same user as the owner of the token

    // Make sure a task table hasn't already been created for the user
    try {
        let table = await Pet.findOne({ user: req.user.id });
        if(table) { // there is already a table for this user
            return res.status(400).json({ errors: [{ msg: 'Pet already exists' }] });
        }

        table = new Pet(pet);

        // Save tasks table and return it as the response
        await table.save();
        res.json(table);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/pet/me
// @desc    Get current users pet info
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const pet = await Pet.findOne({ user: req.user.id }).populate('user', ['name', 'studentID']); // find the user of the user who's token is provided
        
        // if there is no such table
        if(!pet) {
            return res.status(400).json({ msg: 'There is no pet for this user' });
        }

        res.json(pet);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/pet/modify
// @desc    Change the current selected item of pet
// @access  Private
router.post('/modify', [auth, 
    // require shirt or pants, and code of desired
    check('option', 'option is required. Provide shirt or pants').not().isEmpty(), 
    check('awardID', 'awardID is required').not().isEmpty()], 
    async (req, res) => {
    
    // get option and awardID from request body
    const {option, awardID} = req.body;
    
    try {
        // Find the pet in DB
        let petOriginal = await Pet.findOne({ user: req.user.id });
        let pet = petOriginal;
        if(!pet) { // there is already a table for this user
            return res.status(400).json({ errors: [{ msg: 'Pet does not exist' }] });
        }

        // if pet is found make sure awardID exists inside the given option array
        if (option === 'shirt') {
            if (pet.petShirtOptions.includes(awardID)) {
                pet.petShirtSelected = awardID;
            } else {
                return res.status(400).json({ errors: [{ msg: 'You do not own this reward' }] });
            }
        } else if (option === 'pants') {
            if (pet.petPantsOptions.includes(awardID)) {
                pet.petPantsSelected = awardID;
            } else {
                return res.status(400).json({ errors: [{ msg: 'You do not own this reward' }] });
            }
        } else {
            return res.status(400).json({ errors: [{ msg: 'An error has occured with the option provided' }] });
        }

        // Update table and save to DB
        pet = await Pet.findOneAndUpdate(
            { user: req.user.id},
            { $set: pet},
            { new: true }
        );

        res.json(pet);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;