require('dotenv').config()
const port = process.env.PORT || 9000
const express = require('express')
const cors = require('cors')
const initMongoDB = require('./server')
const bodyParser = require('body-parser')
const app = express()

//
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json())

//app.use('/api/users', require('./controllers/usersController'))
app.use('/api/authentication', require('./controllers/authenticationController'))
app.use('/api/products', require('./controllers/productsController'))

// routes

initMongoDB()
app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))