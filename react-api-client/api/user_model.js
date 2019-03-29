var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statsSchema = new Schema({
    commit_id:String, date: { type: Date, default: Date.now }, username:String, repository:String,packages_partially_tested: String,commit_url: String, treemap : String, methods_total: String ,tested_total:String, partially_tested_total: String, non_covered_total: String
});

module.exports = mongoose.model('Stats', statsSchema);
