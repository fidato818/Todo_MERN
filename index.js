const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("./config/db");
const db = mongoose.connection;
var cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.once("open", () => {
  console.log("Database Connected Successfully");
});
db.once("error", function (err) {
  console.log("Could not connect to mongo server!");
  console.log(err);
});

// app.get("/posts", (req, res) => {
//   res.send({
//     name: "adnan",
//   });
// });

app.listen(process.env.PORT, () => {
  console.log("server is listening on 3001");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/client/build/index.html"));
//   });
// }

app.use("/", require("./routes/index"));
