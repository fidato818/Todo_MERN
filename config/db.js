const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
require("dotenv").config();
const mongoURI = process.env.CONNECTION_URL;

// const mongoURI = process.env.MONGOURI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
