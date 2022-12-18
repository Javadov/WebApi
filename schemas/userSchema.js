const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    //_id: {type: mongoose.Schema.Types.ObjectId},
    _firstName: {type: String, required: [true, 'please enter a first name']},
    _lastName: {type: String, required: [true, 'please enter a last name']},
    _email: {type: String, required: [true, 'please enter an email adress'], unique: true},
    _password: {type: String, required: [true, 'please enter a password']},
})

module.exports = mongoose.model("users", userSchema)