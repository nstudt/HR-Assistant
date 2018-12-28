// const config = require('@config/config.js');
const express = require("express");
const app = express();
// const http = require("http").Server(app);
// const uuidv4 = require("uuid/v4");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const passport = require("passport");
const path = require("path");
const db = require("./models/db");
const mongoose = require("mongoose");
const index_controller = require("./controllers/index_controller");

const Employee = require("./models/employee");

// app.use(fileUpload({ preserveExtension: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DO NOT CHANGE THIS - REQUIRED TO RUN BOOTSTRAP LOCALLY
app.use(express.static(__dirname));
app.set("view engine", "hbs");

app.use(passport.initialize());
app.use(passport.session());

hbs.registerPartials(path.join(__dirname, "views/partials"));

//call this to pass data from an onclick to javascript function in the view
hbs.registerHelper("json", function(obj) {
  return new hbs.SafeString(JSON.stringify(obj));
});

app.get("/", index_controller.home_page);

// const port = 5000;
// http.listen(port, function() {
//   console.log("listening on:", port);
// });

db.dbconnect(true);
const employee = new Employee({
  _id: new mongoose.Types.ObjectId(),
  first_name: "john",
  last_name: "doe"
});

employee
  .save()
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));

// db.dbconnect(false);
