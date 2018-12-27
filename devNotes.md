Some basic notes on Mongoose CRUD contained within an Express Router. I've included the entire file so you can see an interesting use of express router as well. https://expressjs.com/en/guide/routing.html

//One more note on Router: Many routes/routers can exist. Create the reference and mount it as shown below:
 
const indexRoute = require("./routes/index);
const customerRoute = require("./routes/customer);

app.use(/, indexRoute);
app.use(/api/customer, 'customerRoute');

//end


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

//define schema
var userDataSchema = new Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection: 'user-data'}); //the {} overrides default naming of collection.

//create model
var UserData = mongoose.model('UserData', userDataSchema);

//find all
router.get('/get-data', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

//insert
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var data = new UserData(item);
  data.save();

  res.redirect('/');
});

//update record
router.post('/update', function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  })
  res.redirect('/');
});

//Delete
router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;