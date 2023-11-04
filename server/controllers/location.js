const Joi = require('joi-oid')
const Location = require('../models/location');

const locationSchema = Joi.object({
  country: Joi.string().required(),
  place: Joi.string(),
  lat: Joi.number(),
  lon: Joi.number()
});

module.exports = {
  insert, read
};

async function insert(location) {
  location = await locationSchema.validateAsync(location, {abortEarly: false});
  return await new Location(location).save();
}

async function read() {
  return Location.find();
}
