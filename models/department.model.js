const mongoose = require('mongoose');

const departmentShema = new mongoose.Schema({
  name: { type: String, require: true }
});

module.exports = mongoose.model('Department', departmentShema);