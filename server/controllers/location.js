const Joi = require('joi-oid')
const Location = require('../models/location');

const locationSchema = Joi.object({
  country: Joi.string().required(),
  place: Joi.string(),
  lat: Joi.number(),
  lon: Joi.number()
});

module.exports = {
  create, getAll, getById
};

async function create(location) {
  location = await locationSchema.validateAsync(location, {abortEarly: false});
  return await new Location(location).save();
}

async function getAll() {
  return Location.find();
}

async function getById(id) {
  return Location.findById(id);
}
