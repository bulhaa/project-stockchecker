let mongoose = require('mongoose');
// let validator = require('validator');

let likeSchema = new mongoose.Schema({
  ip_addr_hash: {
    type: String,
    required: true,
  },
  stock: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Like', likeSchema);