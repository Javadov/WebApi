const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const controller = express.Router()

const {generateAccessToken} = require('../middlewares/authorization')
const userSchema = require('../schemas/userSchema')

controller.route('/signup').post(async (req, res) => {
    const {_firstName, _lastName, _email, _password} = req.body

    if (!_firstName || !_lastName || !_email || !_password)
        res.status(400).json({text: 'Firstname, Lastname, email and password is required.'})

    const user_exist = await userSchema.findOne({_email})
    if(user_exist)
        res.status(409).json({text: 'User already exsist'})
    else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(_password, salt)

        const user = await userSchema.create({
            _firstName,
            _lastName,
            _email,
            _password: hashedPassword
        })

        if (user)
            res.status(201).json({text: `User - ID ${user._id} is created successfully.`})
        else
            res.status(400).json({text: `Something went wrong.`})
    }
})

controller.route('/signin').post(async (req, res) => {
    const {_email, _password} = req.body

    if (!_email || !_password)
        res.status(400).json({text: 'Email and password is required.'})

    const user = await userSchema.findOne({_email})
    if(user && await bcrypt.compare(_password, user._password)) {
        res.status(200).json({
            accessToken: generateAccessToken(user._id)
        })
    } else {
        res.status(400).json({text: 'Incorrect email or Password'})
    }
})

module.exports = controller