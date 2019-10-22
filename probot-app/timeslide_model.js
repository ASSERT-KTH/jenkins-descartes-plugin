var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeslideSchema = new Schema({
    date: { type: Date, default: Date.now },
    username:String,
    timeslide_all : String,
    timeslide_good_pattern:String,
    timeslide_problem_green_to_yellow:String,
    timeslide_problem_green_to_red:String
});

module.exports = mongoose.model('timeslide', timeslideSchema,'timeslide');
