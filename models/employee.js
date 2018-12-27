const uuidv4 = require("uuid/v4");

const employees = []; //placeholder for collection

class Employee {
    constructor(obj) {
        if (obj._id) {
            this._id = obj._id
        } else {
            this._id = uuidv4();
        }
    }
    save() {
        employees.push(this);
    }
    static fetchAll() {
        return this.employees;
    }
}

module.exports = {
    Employee,
}