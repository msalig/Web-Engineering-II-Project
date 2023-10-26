const mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
  country: { type: String },
  place: { type: String},
  lat: { type: Number },
  lon: { type: Number }
});

module.exports = mongoose.model('Location', locationSchema);
