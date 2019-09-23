var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var express = require('express');
var router = express.Router();

var timeslide_db = require('.././timeslide_model');


router.get('/', function (req, res) {
    res.send('GET request to the homepage')
})

router.get('/getTimeslideData', function(req, res) {

    timeslide_db.findOne(function (err, commits) {
        if (err) return console.error(err);
        console.log(commits);
        res.send(commits)
    })


})


module.exports = router;
