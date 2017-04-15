/**
 * Created by Gabriel on 30/03/2017.
 */

var mongoose = require('mongoose');

var hubSchema = new mongoose.Schema({
  code: String,
  name: String,
  immat: [String]
});

var planeSchema = new mongoose.Schema({
  name: String,
  type: String,
  hub: String,
  dests: [String],
  config: {eco: Number, business: Number, first: Number}
});

var durationSchema = new mongoose.Schema({
  hours: Number,
  min: Number,
  sec: Number,
  dec: Number
});

var optiSchema = new mongoose.Schema({
  type: String,
  config: {
    eco: Number,
    business: Number,
    first: Number
  },
  percent: Number,
  duration: durationSchema
});

var lineSchema = new mongoose.Schema({
  from: String,
  to: String,
  distance: Number,
  prices: {eco: Number, business: Number, first: Number, cargo: Number},
  demand: {eco: Number, business: Number, first: Number, cargo: Number},
  planes: [String],
  optis: [optiSchema]
});

var planeSpecSchema = new mongoose.Schema({
  type: String,
  seats: Number,
  rayon: Number,
  conso: Number,
  speed: Number,
  tonnage: Number
});

module.exports = {
  hubSchema: hubSchema,
  lineSchema: lineSchema,
  planeSchema: planeSchema,
  planeSpecSchema: planeSpecSchema
};