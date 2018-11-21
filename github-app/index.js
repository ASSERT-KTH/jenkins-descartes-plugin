require('dotenv').config()

const secret = process.env.WEBHOOK_SECRET

const http = require('http')
const webHookHandler = require('github-webhook-handler')({
  path: '/',
  secret: process.env.WEBHOOK_SECRET
})
const app = require('github-app')({
  id: process.env.APP_ID,
  cert: require('fs').readFileSync('testdescartes.2018-11-12.private-key.pem')
})

http.createServer(handleRequest).listen(3000)

webHookHandler.on('issues', (event) => {
  // ignore all issue events other than new issue opened
  if (event.payload.action !== 'opened') return

  const {installation, repository, issue} = event.payload
  app.asInstallation(installation.id).then((github) => {
    github.issues.createComment({
      owner: repository.owner.login,
      repo: repository.name,
      number: issue.number,
      body: 'Welcome to the robot uprising.'
    })
  })
})

function handleRequest (request, response) {
  if (request.method !== 'POST') return response.end('ok')
  webHookHandler(request, response, () => response.end('ok'))
}

/*

// FUNKAR! basic...

// http is a standard module that comes with Node.js
const http = require('http')

http.createServer(handleRequest).listen(3000)

function handleRequest (request, response) {

  // log request method & URL
  console.log(`${request.method} ${request.url}`)

  // for GET (and other non-POST) requests show "ok" and stop here
  if (request.method !== 'POST') return response.end('ok')

  // for POST requests, read out the request body, log it, then show "ok" as response
  let payload = ''
  request.on('data', (data) => payload += data );
  request.on('end', () => {
    console.log(payload)
    response.end('ok')
  })
}


*/
