require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error('Error',error))
db.once('open', () => console.log('Connection success!!'))

app.use(express.json())

const subscribersRoutes = require('./routes/subscribers')
app.use('/subscribers', subscribersRoutes)
app.listen(3000, () => console.log('Server Started')) 