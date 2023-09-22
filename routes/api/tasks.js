// handles creating, completing, deleting, tasks for students to finish

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // any request with auth as 2nd param will be private
const Tasks = require('../../models/Tasks');
const User = require('../../models/User');
const Pet = require('../../models/Pet');
const Admin = require('../../models/Admin');
const tasksJson = require('../../tasks/tasks.json');
const awardJson = require('../../tasks/award.json');
const {check, validationResult} = require('express-validator');

// @route   GET api/tasks/me
// @desc    Get current users tasks
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const tasks = await Tasks.findOne({ user: req.user.id }).populate('user', ['name', 'studentID', 'avatar']); // find the user of the user who's token is provided
        
        // if there is no such table
        if(!tasks) {
            return res.status(400).json({ msg: 'There is no tasks for this user' });
        }

        res.json(tasks);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/tasks
// @desc    Create a tasks table for the user when the user starts orientation
// @access  Private
router.post('/', auth, async (req, res) => {
    // Build Tasks
    const taskTable = {};
    taskTable.user = req.user.id; // set the user to be the same user as the owner of the token

    // Make sure a task table hasn't already been created for the user
    try {
        let table = await Tasks.findOne({ user: req.user.id });
        if(table) { // there is already a table for this user
            return res.status(400).json({ errors: [{ msg: 'Task table already exists' }] });
        }

        // Add categories and Tasks to the table and save it to DB
        table = new Tasks(taskTable);
        tasksJson.forEach((c)=> {
            let cat = {
                categoryTitle: c.categoryTitle,
                categoryID: c.categoryID,
                tasks: []
            };
            c.tasks.forEach((t) => {
                let task = {
                    taskName: t.taskName,
                    taskID: t.taskID,
                    taskDesc: t.taskDesc,
                    taskLoc: t.taskLoc,
                };
                cat.tasks.push(task);
            });
            table.category.push(cat);
        });

        // Save tasks table and return it as the response
        await table.save();
        res.json(table);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/tasks/admin
// @desc    Update task with provided code. Only for admin
// @access  Private
router.post('/admin', [auth, 
    check('studentID', 'studentID is required').not().isEmpty(), 
    check('taskID', 'taskID is required').not().isEmpty(),
    check('taskComplete', 'A boolean is required').isBoolean()], 
    async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) { // if there are errors
        return res.status(400).json({ errors: errors.array() }); // 400 - bad request
    }

    // check if token belongs to admin
    let adminA = await Admin.findById(req.user.id);
    if(!adminA) { // no such user found in DB
        return res.status(400).json({ errors: [  { msg: 'Invalid Credentials' }] });
    }

    // get studentID and task code from request body
    const {studentID, taskID, taskComplete} = req.body;

    try {
        let user = await User.findOne({ "studentID" : studentID });
        
        let table = await Tasks.findOne({ user: user.id });
        
        
        if(!table) { // student NOT found
            return res.status(400).json({ errors: [{ msg: 'Student ID not found' }] });
        }

        let pet = await Pet.findOne({ user: user.id });
        
        if(!pet) { // student NOT found
            return res.status(400).json({ errors: [{ msg: 'No pet to award' }] });
        }

        // Find the task with the given taskID, and update taskComplete with the provided boolean
        let modifiedTable = table;
        let modifiedPet = pet;

        modifiedTable.category.forEach((c) => {
            c.tasks.forEach((t) => {
                if (t.taskID === taskID) {
                    t.taskComplete = taskComplete;
                    if (taskComplete) { // modified to being true
                        t.taskCompletionDate = Date.now();
                        
                        // lookup the awardID and option for the task
                        var lookUp = awardJson.find(item => item.taskID === taskID);
                        // check if award is shirt or pant and add award
                        if (lookUp.option === 'shirt') {
                            modifiedPet.petShirtOptions.push(lookUp.awardID);
                        } else { // if not shirt it has to be pants
                            modifiedPet.petPantsOptions.push(lookUp.awardID);
                        }
                        
                        
                    } else {
                        t.taskCompletionDate = null;
                        
                    }
                }
            });
        });
        

        // check other tasks in the same category if all are complete mark category as complete and add completion date
        let [categoryID, _] = taskID.split('-'); // extract categoryID

        modifiedTable.category.forEach((c) => {
            if (c.categoryID === categoryID) {
                if(c.tasks.every((t) => t.taskComplete === true)) { // if every taskComplete in t is true
                    c.categoryComplete = true;
                    c.categoryCompletionDate = Date.now();
                    
                } else {
                    c.categoryComplete = false;
                    c.categoryCompletionDate = null;
                    
                }
            }
        });

        // Update table and save to DB
        modifiedTable = await Tasks.findOneAndUpdate(
            { user: user.id},
            { $set: modifiedTable},
            { new: true }
        );

        modifiedPet = await Pet.findOneAndUpdate(
            { user: user.id},
            { $set: modifiedPet},
            { new: true }
        );

        return res.json(modifiedTable);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;