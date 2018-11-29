const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const secret = process.env.WEBHOOK_SECRET

const webHookHandler = require('github-webhook-handler')({
  path: '/',
  secret: process.env.WEBHOOK_SECRET
})
const app_github  = require('github-app')({
  id: process.env.APP_ID,
  cert: require('fs').readFileSync('testdescartes.2018-11-12.private-key.pem')
})

var bodyParser = require('body-parser')


webHookHandler.on('issues', (event) => {
  // ignore all issue events other than new issue opened
  if (event.payload.action !== 'opened') return

  const {installation, repository, issue} = event.payload
  app_github.asInstallation(installation.id).then((github) => {
    github.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      number: issue.number,
      body: 'Welcome to the robot uprising.'
    })
  })
})


// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})


// POST method route
app.post('/', function (req, res) {

console.log('POST request from hook..')
webHookHandler(req, res, () => res.send('ok'))

})


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// all routes prefixed with /api
app.use('/api', router);

// POST /api/users gets JSON bodies
router.post('/', jsonParser, function (req, res) {

 console.log('Bodyparser..POST request..')
 console.log(req.body)

 res.send('POST request to the homepage')
})


// set the server to listen on port 3000
app.listen(port, () => console.log('Listening on port 3000'));


