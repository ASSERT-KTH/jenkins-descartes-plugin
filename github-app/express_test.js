const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const secret = process.env.WEBHOOK_SECRET

const webHookHandler = require('github-webhook-handler')({
  path: '/',
  secret: process.env.WEBHOOK_SECRET
})


const createApp = require('@octokit/rest');

const github_app = createApp({
  id: process.env.APP_ID,
  cert: require('fs').readFileSync('testdescartes.2018-11-12.private-key.pem')
})

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json() // create application/json parser

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// on push event - when someone commits code -> run jenkins build
webHookHandler.on('push', (event) => {

var jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@130.237.59.170:8080', crumbIssuer: true });

jenkins.job.build('test', function(err, data) {
  if (err) throw err;
  console.log('queue item number', data);
});
// decorative link... 

  const {installation, repository, issue} = event.payload

  github_app.asInstallation(installation.id).then((github) => {

      github.issues.createComment({
        owner: event.payload.repository.owner.login,
        repo: event.payload.repository.name,
        number: event.payload.issue.number,
        body: 'Welcome to the robot uprising.'
      });
    });

//
//  OBS!!!!!!!!!! ska man inte skicka tillbaka webhook SIST...EFTER att man har kört Jenkins...
// för... man vill ju ha med Jenkins data!?!?...tror jag..kolla UPPPPPPPP!!
  

 
console.log('POST request from hook..someone commited code!')
})

// GET method route
app.get('/', function (req, res) {


// gör detta här bara för jag inte vet var de ska ligga..eller när de ska köras!!!
/////////////////////////PARSING!/////////////////////


// Read Synchrously
//var fs = require("fs");
console.log("\n *START* \n");
var content = require('fs').readFileSync("content.txt");
console.log("Output Content : \n"+ content);
console.log("\n *EXIT* \n");


// report are at....
//martinch@server170:/var/lib/jenkins/workspace/test/target/pit-reports$ 

// crazy path!...
// ../../../../../var/lib/jenkins/workspace/test/target/pit-reports


// vad vill jag nu.. mm... gå igenom alla..

// metod 1.. ta den senaste... kör ett skript..eller nått..varje gång ett nytt bygge sker..

// om den nu är en node js..fil.. 
   
   // ta den nyaste foldern.. gå in.. läs in methods filen.. parsa det du vill för specifik graph.
   // .. spara undan som en fil i en speciell egen folder...
   // .. nu finns en heatmap folder.. som .. tex.. kan mata graphen med den?..eller..
    // vet inte..men på nått sätt så måste ,,,...man på frontend delen kunna läsa från foldern??... eller..
   // hur funkar det? på nått sätt skapas en Server som graphen läser data ifrån..no idea...

// 201811201810  201811230847  201811261320  201811261347	201811291030  201811291033  201811291117  201811291121	201811291134  201811301330
// 201811202204  201811261243  201811261345  201811291022	201811291032  201811291113  201811291119  201811291122	201811301329  201812031414




/*
var obj = require('./myjson'); // no need to add the .json extension

var jsonQobj=jsonQ(jsonObj);

jsonQ(jsonObj).find("name").value();
*/



////////////////////////////////////////////////////////


res.send('GET request to the homepage')
})


// POST method route
app.post('/', function (req, res) {

console.log('GitHub webhook recieved - POST - Now trigger Jenkins if its a commit..')
webHookHandler(req, res, () => res.send('ok'))
})


// all routes prefixed with /api
app.use('/api', router);

// Use this data to build first graph..
router.post('/', jsonParser, function (req, res) {


  // time to produce fancy stufff...

  // 1) nu vet man .. vilket jenkins bygge det är.. så man kan redan nu skicka en DECORATING LINk..

  // 2) formatera om JSON/METHODS bygget -> datatypen som graphen vill ha..
        // spara undan det i någon folder??..
   
 console.log('Bodyparser..POST request..')
 console.log(req.body)

 res.send('POST request to the homepage')
})

// set the server to listen on port 3000
app.listen(port, () => console.log('Listening on port 3000'));


/* bonus code.. :-)

webHookHandler.on('issues', (event) => {
  // ignore all issue events other than new issue opened
  if (event.payload.action !== 'opened') return

  const {installation, repository, issue} = event.payload
  app_github.asInstallation(installation.id).then((github) => {
    	({
      owner: repository.owner.login,
      repo: repository.name,
      number: issue.number,
      body: 'Welcome to the robot uprising.'
    })
  })
})

*/
