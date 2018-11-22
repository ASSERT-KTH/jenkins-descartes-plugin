require('dotenv').config()  // not really working.. .env file must be in project root

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

http.createServer(handleRequest).listen(5000)

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

