const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true }
});

module.exports = mongoose.model('Product', productShema);