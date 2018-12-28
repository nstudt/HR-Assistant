
const mongoose = require('mongoose');
const uuidv4 = require("uuid/v4");

const employeeSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: String,
    last_name: String,
    first_name: String,
    middle_name: String,
    gender: String,
    address: [{
        address: String,
        street: String,
        purok: String,
        city: String,
        province: String,
        country: String,
        date_active: Date
    }],
    sss_number: String,
    bir_number: String,
    tin_number: String,
    philhealth_number: String,
    hdmf_number: String,

    hired: [{Date}], //allows hiring the same person more than once.
    seperated: [{ Date }],
    position: String,

    salary: [{amount: Number, date: Date}],
    marital: {
        marital_status: String,
        wedding_date: String,
        spouse_name: String,
        marrage_contract: String,
    },
    
    children_names: [{
        name: String,
        dob: Date,
        gender: String
    }],

    work_history: [{
        company_name: String,
        hire_date: Date,
        separation_date: Date,
        starting_pay: Number,
        ending_pay: Number,
        company_contact: String,
        rfl: String
    }],

});

// class Employee {
//     constructor(obj) {
//         if (obj._id) {
//             this._id = obj._id
//         } else {
//             this._id = uuidv4();
//         }
//     }
//     save() {
//         employees.push(this);
//     }
//     static fetchAll() {
//         return this.employees;
//     }
// }

module.exports =  mongoose.model('Employee', employeeSchema);