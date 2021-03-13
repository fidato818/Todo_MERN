const express = require('express')
const router = express()


router.use("/Todo", require("./Todo"))

module.exports = router;