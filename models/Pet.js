// The pet schema for the database. This needs to be generated for every registed user.
// Various options for parts of the pet are present here. The number will be associated with an image hosted by the server
// As students complete categories they are awarded pet cosmetics options hats, clothes, backgrounds, toys.
// The available options a pet owner has to choose from, and the selected option are stored in this model

const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // gets its ObjectID from the objectID of a user model. Similar to SQL foreign key
        ref: 'user'
    },
    petShirtOptions: { // An array of shirt options
        type: [Number],
        default: [0]
    },
    petShirtSelected: {
        type: Number,
        default: 0
    },
    petPantsOptions: { // An array of pants options
        type: [Number],
        default: [0] 
    },
    petPantsSelected: {
        type: Number,
        default: 0
    }
});

module.exports = Pet = mongoose.model('pet', PetSchema);