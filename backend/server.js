const path = require('path')
const express = require('express')
const morgan = require('morgan')
const connectDB = require('./utils/connectDB')
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')

var fs = require('fs')

// Load environment variables from .env
require('dotenv').config()

// Connect to database
connectDB()

const app =  express()

// Use logging in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

// Serve build in production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => 
        res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API Server is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))