const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const secret = process.env.WEBHOOK_SECRET

const webHookHandler = require('github-webhook-handler')({
  path: '/',
  secret: process.env.WEBHOOK_SECRET
})


//const createApp = require('github-app'); // byt till @octa-kit... men då måste create app bytas ..

/* såhär skulle man kunna göra..
// GitHub app

octokit.authenticate({
  type: 'app',
  token: 'secrettoken123'
})
*/

const github_app = require('github-app')({
  id: process.env.APP_ID,
  cert: require('fs').readFileSync('testdescartes.2018-11-12.private-key.pem')
})

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json() // create application/json parser

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// on push event - when someone commits code -> run jenkins build
//webHookHandler.on('push', (event) => {
webHookHandler.on('check_suite', (event) => {   // borde de inte va  check_run ??....


// Kanske bra att ha sen...
//if (event.payload.action !== 'requested') return

/* Kör jenkins sen..
var jenkins = require('jenkins')({ baseUrl: 'http://admin:admin@130.237.59.170:8080', crumbIssuer: true });

jenkins.job.build('test', function(err, data) {
  if (err) throw err;
  console.log('queue item number', data);
});
*/

  const {installation, repository, check_suite} = event.payload

  github_app.asInstallation(installation.id).then((github) => {

      github.checks.update({  

        owner: event.payload.repository.owner.login,
        repo: event.payload.repository.name,
        check_run_id : check_suite.id,
        name: 'Commit decoration.',

  output: {
        title: 'Title text..',
        summary: 'summery text..',
        text: 'my text..'
        },

 actions: [{
        label: '✅ Ready for review..',
        description: 'mydescription.',
        identifier: 'myidentifier'
        }]      
     });
   });


/*
  github_app.asInstallation(installation.id).then((github) => {

const result = await github.checks.update({

	  owner, 
	  repo, 
	  check_run_id, 
	  name, 
	  details_url, 
	  external_id, 
	  started_at, 
	  status, 
	  conclusion, 
	  completed_at, 
	output, 
	output.title, 
	output.summary, 
	output.text, 
	output.annotations, 
	output.annotations[].path, 
	output.annotations[].start_line, 
	output.annotations[].end_line, 
	output.annotations[].start_column, 
	output.annotations[].end_column, 
	output.annotations[].annotation_level, 
	output.annotations[].message, 
	output.annotations[].title, 
	output.annotations[].raw_details, 
	output.images, output.images[].alt, 
	output.images[].image_url, 
	output.images[].caption,
	 actions, actions[].label, 
	actions[].description, 
	actions[].identifier})
    
    });

*/

//
// OBS, ska man inte skicka tillbaka webhook SIST...EFTER att man har kört Jenkins...när man har jenkins data. Jo.

 
console.log('POST request from hook..someone commited code!...checks API running..')
})

// GET method route
app.get('/', function (req, res) {


// Testar bara..
/////////////////////////PARSING!/////////////////////


// Read Synchrously
//var fs = require("fs");
console.log("\n *START* \n");
var content = require('fs').readFileSync("content.txt");
console.log("Output Content : \n"+ content);
console.log("\n *EXIT* \n");


// report are at....
//martinch@server170:/var/lib/jenkins/workspace/test/target/pit-reports$ 

// ..my path...
// ../../../../../var/lib/jenkins/workspace/test/target/pit-reports


   
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


  // time to produce fancy stuff...

   
 console.log('Bodyparser..POST request..')
 console.log(req.body)

 res.send('POST request to the homepage')
})

// set the server to listen on port 3000
app.listen(port, () => console.log('Listening on port 3000'));
