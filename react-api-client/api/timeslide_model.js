var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeslideSchema = new Schema({
    date: { type: Date, default: Date.now },
    username:String,
    timeslide_all : String,
    timeslide_good_pattern:String,
    timeslide_problem_green_to_yellow:String,
    timeslide_problem_green_to_red:String,

    timeslide_all_partially_tested_in_last_commit: String,
    timeslide_all_pseudo_tested_in_last_commit   : String
});

module.exports = mongoose.model('timeslide', timeslideSchema,'timeslide');
