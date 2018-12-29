const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// mongoose.connect('localhost:27017/test');
const db = require("../models/db");
const Employee = require("../models/employee");

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.params.id);
    res.render('index');
});
 module.exports = router;