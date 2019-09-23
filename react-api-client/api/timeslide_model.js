var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeslideSchema = new Schema({
    date: { type: Date, default: Date.now }, username:String, timeslide_all : String
});

module.exports = mongoose.model('timeslide', timeslideSchema,'timeslide');
