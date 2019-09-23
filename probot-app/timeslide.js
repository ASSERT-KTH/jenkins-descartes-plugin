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
    TO_fake_payload_date.setDate(FROM_fake_payload_date.getDate() + 1); // faking it with +1 in todays date

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
    to_date_edited.setSeconds(to_date_edited.getSeconds() - 100)  // 100 sekund..vet ej.. vad som händer om man kommitar en massa...låt bli 4 now..
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

        // do once...
        var timeslide_file_DATA = createTimeslideData(my_jsonfile,  "2019-09-24T01:55:09.856Z")
        update_timeslide_DB(timeslide_file_DATA)
    }
})
