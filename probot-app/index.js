var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/commits');

// Register the mongoose model
const Stats = require('./StatSchema')
var timeslide_db = require('./timeslide_model');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 // we're connected!
    console.log('db connected...')
});

// SAVE for re-authentication
var my_context
var jsonfile

module.exports = app => {

    app.log('Yay, the app was loaded!')

// Github sends PAYLOAD
    app.on('push', async context => {

        var jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@130.237.59.170:8080', crumbIssuer: true })

       console.log("------------------------------------------------------------------------------")
       console.log(context.payload.repository.name)
       console.log("------------------------------------------------------------------------------")

        jenkins.job.build({name: 'test', parameters: { commitid: context.payload.head_commit.id } }, function(err) {
            if (err) throw err;
        });

        // if we in the future need alter jenkins jobs..
       /*
       if (context.payload.repository.name === "testaaaaaaaaaaaaaa")
       {
           jenkins.job.build({name: 'test-dhell' }, function(err) {
               if (err) throw err;
            });
            console.log("well done yoda MASTER!")
       }
       else
       {
           console.log("---------------------should not be seeeeeeeeeeeeeeeeeen...................................")
           jenkins.job.build({name: 'test-dhell', parameters: { commitid: context.payload.head_commit.id } }, function(err) {
           if (err) throw err;
           });
       }
       */

        app.log('push event fired')
        app.log(context.payload)

        my_context = context

       // kankse måste skapa status här...i värsta fall,,,?..
    })



  // Get an express router to expose new HTTP endpoints
  const router = app.route('/')

  // Use any middleware
  router.use(require('express').static('public'))

    var bodyParser = require('body-parser')

    // create application/json parser
    var jsonParser = bodyParser.json()

    const asyncHandler = require('express-async-handler')

              // --/  är det...                              , next ... tog bort det...
    router.post('/app', jsonParser, asyncHandler(async (req, res, next) => {
//      router.post('/app', jsonParser, (req, res) => {

    // getting expired credential

    //the token used in `context.github` expires after 59 minutes and Probot caches it.
    //Since you have `context.payload.installation.id`, you can reauthenticate the client with:

    const log = app.log
    const my_github = await app.auth(my_context.payload.installation.id,log) // re-authenticate...

        var jsonQ = require('jsonq')
        var glob = require('glob')

        // files is an array of filenames.  .... can get this file some better way..
        // *** TODO *** the filepath should be dynamic in the future...
    //  glob("../../../../../var/lib/jenkins/workspace/test-dhell/target/pit-reports/*/methods.json", function (err, files) {
        glob("../../../../../var/lib/jenkins/workspace/test/target/pit-reports/*/methods.json", function (err, files) {

            if (err) {
                console.log(err)
            } else {

                // a list of paths to javaScript files in the current working directory
                // TODO - fixa jsonfile LOKALT!!!
                jsonfile = files.slice(-1).pop()

                console.log(jsonfile)

                // TODO -skriva metoder som.. läser från fil.
                const fs = require('fs')

                let rawdata = fs.readFileSync(jsonfile)
                let methodsjson = JSON.parse(rawdata)

                var allmethods = methodsjson.methods

                var temp = []
                // loop all methods..
                for(var i = 0; i < allmethods.length; i++)
                {
                    var obj = allmethods[i];
                    temp.push(obj.package)
                }

                var uniqueItems = Array.from(new Set(temp))

                var array_all = []

                for(var i = 0; i < uniqueItems.length; i++)
                {
                    var obj = uniqueItems[i];

                    var jsonObj_child = {
                        "name": obj,
                        "tested": 0,
                        "notcovered": 0,
                        "partiallytested": 0,
                        "pseudotested": 0,
                        "partiallytested_links": [],
                        "pseudotested_links": []
                    };

                    array_all.push(jsonObj_child)
                }


                for(var i = 0; i < allmethods.length; i++)
                {
                    var obj = allmethods[i];

  //                  console.log(obj.package);

                    array_all.forEach(function(entry) {

                        if(obj.package === entry.name)
                        {
                            // lets count them ways..
                            if (obj.classification === 'tested' )
                            {
                                entry.tested = entry.tested + 1
                            }
                            if (obj.classification === 'partially-tested' )
                            {
                               entry.partiallytested = entry.partiallytested + 1

                               // add link to some..
                               var linkstring = "link " + entry.partiallytested

                             //  var link = "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/"+ obj.package +"/"+ obj['file-name'] +"#L"+ obj['line-number']

                               var branchName = String(my_context.payload.ref).split('/').pop();

                               var link = "https://github.com/"+ my_context.payload.repository.full_name +"/blob/" + branchName +"/src/main/java/"+ obj.package +"/"+ obj['file-name'] +"#L"+ obj['line-number']

                               var myObj = {[linkstring]: link};

                               entry.partiallytested_links.push(myObj);
                               //   "linkstring" : "https://github.com/" //+ owner + "/"+ repo + "/blob/{commit}/src/main/java/{method.package}/{filename}#L{linenumber}"
                            }
                            if (obj.classification === 'pseudo-tested')
                            {
                               entry.pseudotested = entry.pseudotested + 1

                               var linkstring = "link " + entry.pseudotested

                             //  var link = "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/"+ obj.package +"/"+ obj['file-name'] +"#L"+ obj['line-n$

                               var branchName = String(my_context.payload.ref).split('/').pop();

                               var link = "https://github.com/"+ my_context.payload.repository.full_name +"/blob/" + branchName +"/src/main/java/"+ obj.package +"/"+ obj['file-name'] +"#L"+ obj['line-number']


                               var myObj = {[linkstring]: link};

                               entry.pseudotested_links.push(myObj);
                            }
                            if (obj.classification === 'not-covered' )
                            {
                                entry.notcovered = entry.notcovered + 1
                            }
                        }
                    });
                }


                // count count count..

                var methods_total = allmethods.length
                var tested_total = 0
                var partially_tested_total = 0
                var pseudo_tested_total = 0
                var non_covered_total = 0

                array_all.forEach(function(i, idx, array){

                 tested_total += i.tested
                 partially_tested_total += i.partiallytested
                 pseudo_tested_total += i.pseudotested
                 non_covered_total += i.notcovered
                });

                var packages_partially_tested = '{'
                var packages_pseudo_tested = '{'

                var treemap='{"name":"Mutation test","color":"hsl(187, 70%, 50%)","children":['
                var result= '{'

                array_all.forEach(function(i, idx, array){

                    var result_package = '"package ' + String(idx)+ '": "' + String(i.name) + '  Tested: ' + String(i.tested) + '  Partially tested: ' + String(i.partiallytested) + '  Not covered: ' + String(i.notcovered) + '"'

                    var result_partially_tested = '"'+ String(i.name) +'" : ' + JSON.stringify(i.partiallytested_links)
                    var result_pseudo_tested = '"'+ String(i.name) +'" : ' + JSON.stringify(i.pseudotested_links)

                    var pacpac='{"name":"' + String(i.name) +'","color":"hsl(87, 70%, 50%)","children":[' +

                        '{"name": "Tested",' +
                        '"color":"hsl(99, 98%, 51%)",' +
                        '"loc":' + i.tested +
                        '},{"name":"Partially tested",' +
                        '"color": "hsl(53, 100%, 50%)",' +
                        '"loc": ' + i.partiallytested +
                        '},{"name":"Pseudo tested",' +
                        '"color": "hsl(0, 0%, 50%)",' +
                        '"loc": ' + i.pseudotested +
                        '},{"name": "Not covered",' +
                        '"color": "hsl(348, 100%, 50%)",' +
                        '\"loc\": ' + i.notcovered

                    var tail= '}]},'
                    var last_tail= '}]}'

                    var result_tail= ','

                    if (idx === array.length - 1){
                        console.log("Last callback call at index " + idx + " with value " + i );
                        treemap = treemap + pacpac + last_tail
                        result = result + result_package

                        packages_partially_tested = packages_partially_tested + result_partially_tested
                        packages_pseudo_tested = packages_pseudo_tested + result_pseudo_tested

                    }
                    else
                    {
                        treemap = treemap + pacpac + tail
                        result = result + result_package + result_tail

                        packages_partially_tested = packages_partially_tested + result_partially_tested + result_tail
                        packages_pseudo_tested = packages_pseudo_tested + result_pseudo_tested + result_tail

                    }
                });


                var close_tree = ']}'
		var close_result = '}'

		treemap = treemap + close_tree
		result = result + close_result

                packages_partially_tested = packages_partially_tested + close_result
                packages_pseudo_tested = packages_pseudo_tested + close_result

           ///// JUST CHECKING ////////////////////////////////////////
           var isJSON = require('is-valid-json');

           // "obj" can be {},{"foo":"bar"},2,"2",true,false,null,undefined, etc.
           // var obj = "any JS literal here";

           if( isJSON(result) ){

           // Valid JSON, do something
          console.log(result)
          }
          else{

          // not a valid JSON, show friendly error message
          console.log("not valid JSON")
          console.log(result)
          }

                // jenkins parsing
                //    let jenkins_json = JSON.stringify(req.body) // jenkins info...
                console.log(req.body)

                var jenkinsobj = jsonQ(req.body)

                var jenkins_status = jenkinsobj.find('build').find('status').firstElm().toLowerCase();

                var jenkins_all = jenkinsobj.find('build').find('url').firstElm()
                var jenkins_info = jenkins_all.replace(/\//g, "_")

                // replace / with _
                console.log('jenk_:'+ jenkins_info)
                console.log('jenk_status:'+ jenkins_status)

                var stat = new Stats({ commit_id: my_context.payload.head_commit.id,
                                       date: my_context.payload.head_commit.timestamp,
                                       username: my_context.payload.head_commit.author.username,
                                       repository:my_context.payload.repository.name,
                                       packages_partially_tested: packages_partially_tested ,

				       // NEW
                                       packages_pseudo_tested: packages_pseudo_tested ,

                                       commit_url: my_context.payload.head_commit.url ,
                                       treemap : treemap,
                                       methods_total: methods_total ,
                                       tested_total: tested_total,
                                       partially_tested_total: partially_tested_total ,

                                       // NEW
                                       pseudo_tested_total : pseudo_tested_total,

                                       non_covered_total: non_covered_total });

                stat.save(function (err, somestat) {
                  if (err) return console.error(err);
                });

            const commitstatus = my_context.repo({

                  state : jenkins_status,
                  target_url : 'http://130.237.59.170:3001/' + my_context.payload.head_commit.id ,
                  description : jenkins_info,
                  context : "continuous-integration/jenkins",
                  sha: my_context.payload.head_commit.id,
                  message : my_context.payload.head_commit.message

                })

             //   return my_context.github.repos.createStatus(commitstatus)
                res.send(my_github.repos.createStatus(commitstatus))


                // HÄR KOMMER TIMESLIDE code...
                //----------------------------------------
                // behövr... gör om SEN

                var payload_timestamp = my_context.payload.head_commit.timestamp


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

                function getTimeslide_DB_data(jsonfile, payload_timestamp) {

                    db.collection('timeslide').count(function(err, count) {
                        console.dir(err);
                        console.dir(count);

                        if( count == 0) {
                            console.log("No Found Records.");

                            var timeslide_file_DATA = createTimeslideData(jsonfile, payload_timestamp)

                            var timecapsule = new timeslide_db({

                                date: new Date(),
                                username: "MartinO",
                                timeslide_all : JSON.stringify(timeslide_file_DATA)
                            });

                            timecapsule.save(function (err, somestat) {
                                if (err) return console.error(err);
                            });
                        }
                        else {
                            console.log("Found Records : " + count);

                            timeslide_db.findOne(function (err, commits) {

                                if (err)
                                {
                                    console.log('The search errored');
                                }
                                else
                                {
                                    return successCallback(commits);
                                };
                            })

                        }
                    });
                }

                var successCallback = function(data) {
                    console.log("Success");

                    var timeslide_file_DATA = createTimeslideData(jsonfile, payload_timestamp)  // HÄR måste ja ändra för varje commit!...ååå suck !!

                    var timeslide_DB_DATA = JSON.parse(data.timeslide_all)  // Must be casted into Array object!

                    var merged_DATA = merge2one(timeslide_DB_DATA, timeslide_file_DATA, payload_timestamp)

                    console.log(JSON.stringify(merged_DATA,null, 2))  // kolla de blev... -1 sekund..  -> FUNKAR

                    update_timeslide_DB(merged_DATA)
                }

                function merge2one(from_DB, from_methods_file, timestamp)
                {


                    // backa den sista commiten som finns i DB med 100 sekunder..

                    // nu kommer den nya commiten ha start tid som är 100 sekunder IFRÅN sist commiten i DB..

                    //    sista DB commit <---100 sec---> nya commit

                    // vad händer om flera commits kommer in.. mellanrummet...det vita.. är det för litet??...

                    // minns inte vad som hände.. varför blev det

                    var to_date_edited = new Date(timestamp)




             // SKIPPA ta bor 100 sek..slut datum kan va samma som nästa commits start datum....funkar IAF!?       to_date_edited.setSeconds(to_date_edited.getSeconds() - 100)  // 100 sekund..vet ej.. vad som händer om man kommitar en massa...låt bli 4 now..
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


                //---------------------------------------
                // behöver:

                var timeslide_DB_DATA = getTimeslide_DB_data(jsonfile, payload_timestamp)

                // vet inte va ja ska göra med retur datat.. :-/ console.log något??
           }
        })
    })    )
}

