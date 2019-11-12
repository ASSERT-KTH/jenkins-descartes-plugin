var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/commits");  // 'commits' verkar vara en collection?!?! inte en DB namn?? wtf..????
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var timeslide_db = require('./timeslide_model');

//var jsonfile = "methods_spoon_BIG.json"//"methods_apache_commons_commit_1.json"

var timeslide_entry = class timeslide_entry {
    constructor(method_name, package_name, classification, timestamp_from, timestamp_to) {
        this.method_name = method_name;
        this.package_name = package_name;
        this.classification = classification;
        this.timestamp_from = timestamp_from;
        this.timestamp_to = timestamp_to;
    }

    returnEntry() {
        // clean code! ;-)
        return {"group": this.method_name,
            data : [ {"label": this.package_name,
                data : [{ timeRange: [this.timestamp_from, this.timestamp_to],
                    "val" : this.classification }]}]};
    }
}

// takes the methods.js file and converts it to an array with timeslide objects
function createTimeslideData(jsonfile , payload_timestamp) {    // tex.. 2019-08-29T09:55:09.856Z

    var all_timeslide_entries = []
    const fs = require('fs')

    let rawdata = fs.readFileSync(jsonfile)
    let methodsjson = JSON.parse(rawdata)

    var allmethods = methodsjson.methods

// ----------- fix timestamp----------------
// timestamp - få tiden som då commiten gjordes, fås från github payload = FROM
    var FROM_fake_payload_date = new Date(payload_timestamp);

// faking the TO date, since we don't know when the next commit will be. The TO date will be changed on the next commit.
    var TO_fake_payload_date = new Date(payload_timestamp);
    TO_fake_payload_date.setHours(FROM_fake_payload_date.getHours() + 1); // faking it with +1 hour..in todays date

//---------------------------------- make timeslide DATA from methods.js --------------------------
    for (var i = 0; i < allmethods.length; i++) {
        var testmethod = allmethods[i];

        var textArray = [
            'tested',
            'partially-tested',
            'pseudo-tested',
            'not-covered'
        ];
        var randomNumber = Math.floor(Math.random()*textArray.length);

        // create unique KEY .. looks bad..bad way...!...... FIX later...
        //  var poo = new timeslide_entry(testmethod.name + testmethod['line-number'], testmethod.package, textArray[randomNumber], FROM_fake_payload_date, TO_fake_payload_date)
        //  all_timeslide_entries.push(poo.returnEntry())


        // create unique KEY .. looks bad..bad way...!...... FIX later...
        var poo = new timeslide_entry(testmethod.name + testmethod['line-number'], testmethod.package, testmethod.classification, FROM_fake_payload_date, TO_fake_payload_date)
        all_timeslide_entries.push(poo.returnEntry())

    }

    return all_timeslide_entries
}

function getTimeslide_DB_data() {

    timeslide_db.findOne(function (err, commits) {

        if (err)
        {
            console.log('The search errored');
        }
        else if (_.isEmpty(commits)) {
            console.log('record not found')
            // här måste vi skapa första inlägget..  typ SAVE.. måste nog ha mer än timeslide DATA...
            //
            //  gör nått som nedan... ? fast inte update?!?...bara skapa..
            //
            // DO ONCE TO EMPTY DB! ONLY!
            var timeslide_file_DATA = createTimeslideData(jsonfile, "2019-10-29T09:55:09.856Z")
            update_timeslide_DB(timeslide_file_DATA)
            //  console.log(JSON.stringify(timeslide_file_DATA,null, 2))  // kolla de blev... -1 sekund..  -> testad redan - FUNKAR
        }
        else
        {
            return successCallback(commits);
        };
    })
}

var successCallback = function(data) {
    console.log("Success");
// do something with data

    var timeslide_file_DATA = createTimeslideData(jsonfile, "2019-12-18T09:55:09.856Z")  // HÄR måste ja ändra för varje commit!...ååå suck !!

    var timeslide_DB_DATA = JSON.parse(data.timeslide_all)  // Must be casted into Array object!

    var merged_DATA = merge2one(timeslide_DB_DATA, timeslide_file_DATA, "2019-12-18T09:55:09.856Z")

    console.log(JSON.stringify(merged_DATA,null, 2))  // kolla de blev... -1 sekund..  -> FUNKAR

    update_timeslide_DB(merged_DATA)
}

function merge2one(from_DB, from_methods_file, timestamp)
{

    var to_date_edited = new Date(timestamp)
   // SKIPPA... to_date_edited.setSeconds(to_date_edited.getSeconds() - 100)  // 100 sekund..vet ej.. vad som händer om man kommitar en massa...låt bli 4 now..
    // Du måste ändra i TO datum i det som redan finns i DB
    for (var i = 0; i < from_DB.length; i++)
    {
        from_DB[i].data[0].data[0].timeRange[1] = to_date_edited // to string???
    }

    //  console.log(JSON.stringify(from_DB,null, 2))  // kolla de blev... -1 sekund..  -> testad redan - FUNKAR

    // MERGE TIME..
    for (var i = 0; i < from_methods_file.length; i++)
    {
        var methodname = from_methods_file[i].group

        for (var j = 0; j < from_DB.length; j++)
        {

            if (from_DB[j].group === methodname)
            {
                from_methods_file[i].data[0].data = from_methods_file[i].data[0].data.concat(from_DB[j].data[0].data);
            }
        }
    }
//  console.log(JSON.stringify(from_methods_file,null, 2))  // kolla de blev... -1 sekund..  -> testad redan - FUNKAR

    return from_methods_file;
}

function update_timeslide_DB(timeslide_DATA) {

    var myquery = { username: "MartinO" };
    var newvalues = { $set: {timeslide_all: JSON.stringify(timeslide_DATA) } };  // this is the field that will be updated...
    timeslide_db.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
}

// ______________POKEmn GO! ______________________________________________________
// _______________________________________________________________________________

// var timeslide_file_DATA = createTimeslideData(jsonfile)

//time tooo run it all...
//var timeslide_DB_DATA = getTimeslide_DB_data()

// DO ONCE TO EMPTY DB! ONLY!
//var timeslide_file_DATA = createTimeslideData(jsonfile, "2019-10-29T09:55:09.856Z")
//update_timeslide_DB(timeslide_file_DATA)
//console.log(JSON.stringify(timeslide_file_DATA,null, 2))  // kolla de blev... -1 sekund..  -> testad redan - FUNKAR

////////////////////////////////////////////////7

var glob = require('glob')

// files is an array of filenames.  .... can get this file some better way..
// *** TODO *** the filepath should be dynamic in the future...
glob("../../../../../var/lib/jenkins/workspace/test/target/pit-reports/*/methods.json", function (err, files) {

    if (err) {
        console.log(err)
    } else {
        // a list of paths to javaScript files in the current working directory
        // TODO - fixa jsonfile LOKALT!!!
        var my_jsonfile = files.slice(-1).pop()



//................. is empty??---------------------

// To Count Documents of a particular collection
        db.collection('timeslide').count(function(err, count) {
            console.dir(err);
            console.dir(count);

            if( count == 0) {
                console.log("No Found Records.");
            }
            else {
                console.log("Found Records : " + count);
            }
        });
//-------------------------------------
function create_patterns() {

  var query = timeslide_db.find({ username: 'MartinO'}).lean().exec(function (err, docs) {

    // docs are plain javascript objects instead of model instances
   // var timeslide_DB_DATA = JSON.parse(docs)  // Must be casted into Array object!

    var timeslide_raw = JSON.parse(docs[0].timeslide_all) // är detta e array..nej..

    console.log( Object.getPrototypeOf(timeslide_raw))   // [{ someshit....}] ....
    console.log( timeslide_raw.length)   // [{ someshit....}] ....

    var timeslide_good_pattern = []
    var timeslide_problem_green_to_yellow = []
    var timeslide_problem_green_to_red = []

    for (var i=0 ;i < timeslide_raw.length;i++)
    {
      // get last value of all the commited methods.. like in timespan.. last element in the timespan and its VALUE
     // var last_value_in = timeslide_raw[i].data.slice(-1)[0].data.slice(-1)[0].val

      // fel borde va först valueee... först är det nyaste..alltså sista commiten!...
      var last_value_in = timeslide_raw[i].data[0].data[0].val


      for (var j = 0; j < timeslide_raw[i].data[0].data.length; j++) // stega igenom all timeRange+values i metoden..
      {
        var value = timeslide_raw[i].data[0].data[j].val              // få value... tested, non-covered osv..

        if (last_value_in === 'tested' && value !== 'tested') {  // om sista commiten är 'tested' men det finns commits innan som inte gav tested så är det bra..
          timeslide_good_pattern.push(timeslide_raw[i])
        }
        else if (last_value_in === 'partially-tested' && value === 'tested' )
        {
          timeslide_problem_green_to_yellow.push(timeslide_raw[i])
        }
        else if (last_value_in === 'pseudo-tested' && value === 'tested' )
        {
          timeslide_problem_green_to_red.push(timeslide_raw[i])
        }
      }

    }
    console.log(timeslide_good_pattern[0].data[0])
    console.log("---------gOOD!-----------")
    console.log(timeslide_problem_green_to_yellow)
    console.log("---------gOOD............")
    console.log(timeslide_problem_green_to_red)


    var myquery = { username: "MartinO" };
    var newvalues = { $set: {timeslide_good_pattern : JSON.stringify(timeslide_good_pattern) ,timeslide_problem_green_to_yellow : JSON.stringify(timeslide_problem_green_to_yellow), timeslide_problem_green_to_red : JSON.stringify(timeslide_problem_green_to_red)} };  // this is the field that will be updated...
    timeslide_db.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });

  });
}
//_______________________________




        // do once...
        var timeslide_file_DATA = createTimeslideData(my_jsonfile,  "2019-11-12T01:55:09.856Z")
     //   update_timeslide_DB(timeslide_file_DATA)

        var stat = new timeslide_db({

            date: new Date(),
            username: "MartinO",
            timeslide_all : JSON.stringify(timeslide_file_DATA)
        });

        stat.save(function (err, somestat) {
            if (err) return console.error(err);
        });

        /////////////////////////////////////////////
        create_patterns()
//////////////////////////////////////////////////

    }
})


