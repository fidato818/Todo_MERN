const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
require('dotenv').config()
const mongoURI = "mongodb+srv://fidato:JGaWbTepyVio9SV9@cluster0.tvc7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// const mongoURI = process.env.MONGOURI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose 