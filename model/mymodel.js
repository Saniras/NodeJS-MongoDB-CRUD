
const mongoose = require("mongoose");

const mymodelSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

    const mymodelPage = mongoose.model('User', mymodelSchema, 'User');
    module.exports = mymodelPage;