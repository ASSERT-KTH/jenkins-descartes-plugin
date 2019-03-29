var express = require('express');
var router = express.Router();

var User = require('.././user_model');

//var minicommit = new Commit({ "commit_id" : "66645","package_id" : "123","tested" : "123","partially-tested" : "123","not_covered" : "123", "methodsfilename" : "12345" });

User.find(function (err, commits) {
  if (err) return console.error(err);
  console.log(commits);
})

router.get('/:tagId', function(req, res) {

  var query  = User.where({ commit_id: req.params.tagId });

  console.log('letar ...')

  query.findOne(function (err, commit) {
    if (err) return handleError(err);
    if (commit) {
      // doc may be null if no document matched
      console.log('hittade ...')

      res.send(commit);
      // res.json(commit);  // kan även vara:....    res.send(commit)
    }
  });

})


router.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

module.exports = router;
