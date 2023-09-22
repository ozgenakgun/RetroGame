// The task schema for the database. This needs to be generated for every registed user.
// Various category names and tasks have to be filled after this is generated.
// Some fields might be removed in the future if they are not required.

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // gets its ObjectID from the objectID of a user model. Similar to SQL foreign key
        ref: 'user'
    },
    category: [
        {
            categoryTitle: { // the title of the category, can be things like Library, Enrolment Services etc.
                type: String,
                required: true
            },
            categoryID: {
                type: String,
                required: true
            },
            categoryComplete: { // If all tasks in a category are complete set this to true
                type: Boolean,
                default: false
            },
            categoryCompletionDate: {
                type: Date
            },
            tasks: [ // an array of tasks within a category
                {
                    taskName: { // name of task (Check out a book)
                        type: String,
                        required: true
                    },
                    taskID: {
                        type: String,
                        required: true
                    },
                    taskDesc: { // how to complete task (How to check out a book)
                        type: String,
                        required: true
                    },
                    taskLoc: { // location of task (How to get to the library)
                        type: String,
                        required: true
                    },
                    taskCompletionDate: {
                        type: Date,
                    },
                    taskComplete: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ]
});

module.exports = Tasks = mongoose.model('tasks', TaskSchema);