const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// mongoose.connect('localhost:27017/test');
const db = require("../models/db");
const Employee = require("../models/employee");


// db.dbconnect(false);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/get-data', async (req, res) => {
  db.dbconnect(true);
  console.log(req.params.employee_id);
  try {
    let employees;
    if (req.query.term) {
      var regExpTerm = new RegExp(req.query.term, "i");
      var regExpSearch = [
        { first_name: { $regex: regExpTerm } },
        { last_name: { $regex: regExpTerm } },
        { company_name: { $regex: regExpTerm } },
        { employee_id: { $regex: regExpTerm } }
      ];
      employees = await Employee.find({
        // userId: req.params.id,
        $or: regExpSearch
      });
    } else {
      //no filter - all employees
      employees = await Employee.find({ company_id: req.params.company_id }); //TODO:add employee.company_id to req.params
    }
console.log('in /api/employee router')
    res.send(employees);
  } catch (err) {
    return res.status(500).send(err);
  }
  db.dbconnect(false);
});

router.post("/insert", async (req, res) => {
  db.dbconnect(true);
  const employee = new Employee( req.body );
  try {
    let newEmployee = await employee.save();

    res.set(
      "Location",
      "http://localhost:3000/" + req.params.id + "/employee/" + newEmployee.id
    );
    res
      .status(201)
      .send({ response: "Employee created for userId " + req.params.id });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(409).send(new MyError("Duplicate key", [err.message]));
    }

    res.status(500).send(err);
  }
  db.dbconnect(false);
});

router.post("/update", async (req, res) => {
  db.dbconnect(true);
  try {
    let employee = await Employee.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    if (!employee) {
      return res
        .status(404)
        .send(
          new MyError("Not Found Error", [
            "Employee for id " + req.body._id + " not found"
          ])
        );
    } else {
      res.status(200).send(employee);
    }
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(409).send(new MyError("Duplicate key", [err.message]));
    }
    res
      .status(500)
      .send(
        new MyError("Unknown Server Error", [
            "Unknow server error when updating employee" + req.body._id
        ])
      );
  }
  db.dbconnect(false);
});

router.post("/delete", async (req, res) => {
  db.dbconnect(true);
  try {
    let employee = await employee.findOneAndRemove({
      _id: req.params.employeeId,
      userId: req.params.userId
    });

    if (!employee) {
      return res
        .status(404)
        .send(
          new MyError("Not Found Error", [
            "employee for user id " +
              req.params.userId +
              " and employee id " +
              req.params.employeeId +
              " not found"
          ])
        );
    } else {
      res.status(204).send("employee successfully deleted");
    }
  } catch (err) {
    return res
      .status(500)
      .send(
        new MyError("Unknown server error", [
          "Unknown server error when trying to delete employee with id " +
            req.params.employeeId
        ])
      );
  }
  db.dbconnect(false);
});

module.exports = router;