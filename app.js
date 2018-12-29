// const config = require('@config/config.js');
const express = require("express");
const app = express();
// const http = require("http").Server(app);
// const uuidv4 = require("uuid/v4");
const hbs = require("hbs");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
const passport = require("passport");
const path = require("path");
// const db = require("./models/db");
// const mongoose = require("mongoose");
// const index_controller = require("./controllers/index_controller");
const employeeRoutes = require('./routes/employeeRoutes');
const employerRoutes = require('./routes/employerRoutes');
const indexRoutes = require('./routes/indexRoutes');


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

app.use("/", indexRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/employer", employerRoutes);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// const port = 5000;
// http.listen(port, function() {
//   console.log("listening on:", port);
// });

module.exports = app;
