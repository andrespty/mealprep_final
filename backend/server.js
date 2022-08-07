const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const users_router = require('./routes/users.route')
const meals_router = require('./routes/meals.route')
const foods_router = require('./routes/food.route')
const misc_router = require('./routes/miscs.route')

app.use('/users', users_router)
app.use('/meals', meals_router)
app.use('/foods', foods_router)
app.use('/misc', misc_router)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})