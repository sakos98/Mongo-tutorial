const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
  name: { type: String, require: true },
  client: { type: String, require: true }
});

module.exports = mongoose.model('Product', productShema);