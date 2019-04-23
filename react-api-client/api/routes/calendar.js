var express = require('express');
var router = express.Router();

var User = require('.././user_model');

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose


//var minicommit = new Commit({ "commit_id" : "66645","package_id" : "123","tested" : "123","partially-tested" : "123","not_covered" : "123", "methodsfilename" : "12345" });

User.find(function (err, commits) {
    if (err) return console.error(err);
    console.log(commits);
})

router.get('/', function (req, res) {
    res.send('GET request to the homepage')
})


router.get('/getCalenderData', function(req, res) {

    var query = User.find({}); // get all...

    function convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    query.select('commit_id date partially_tested_total'); // get just these fields..

    query.exec(function (err, commit) {
        if (err) return handleError(err);

        var obj = JSON.parse(JSON.stringify(commit))

        // loop thrue mongoDB.. build a json array.
        // finns DB-element i ARRAY_allt ?
        //  ja - ta array-element från ARRAY-allt och sätt in i 'details' arrayen DB-element..
        //  nej - ta ARRAY-allt och sätt in ett root-element längst bak med 'push'

        var dataQ =[]

        obj.forEach(function(element, index) {

            const checkUsername = obj => convertDate(new Date(obj.date)) === convertDate(new Date(element.date));

            if (dataQ.some(checkUsername))
            {
                // TECH DEBT
                // jag antar nu att den sista i arrayen

                var index= dataQ.length - 1; //Last index of array

                var myObj = {['name']: element.commit_id , ['date']: element.date, ['value']: element.partially_tested_total }

                dataQ[index].details.push(myObj)
            }
            else {

                console.log("empty array.. :-/")

                var jsonObj_root = {
                    "date": element.date,
                    "total": "99999",  // OBS!! vi bryr oss inte om TOTAL här..de här är roten..hmm..
                    "details" : [{
                        name: element.commit_id,
                        date: element.date,
                        value: element.partially_tested_total
                    }]
                };

                dataQ.push(jsonObj_root)
            }
        });

        // update the total in array. Value is partially tested and the Total is now average of the values (partially tested)
        dataQ.forEach(function(element, index) {

            var sum = 0
            element.details.forEach(function(element, index) {

                sum += parseInt(element.value, 10);
            });

            element.total = Math.round(sum/element.details.length)
        });

        console.log("--------------------RESULT-----------------------------")
    //    console.log(JSON.stringify(dataQ))


        res.json(dataQ);
    }); // query exec...


})




module.exports = router;
