import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker.js';  FUNKAR ,,men intellij ger error fast de funkar..störigt..


ReactDOM.render(<App />, document.getElementById('root'));


////////////////////

const http = require('http');
var server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type':'text/html'});
    res.end('<h1>Hello NodeJS</h1>');
}).listen(8000, '130.237.59.170');


/////130.237.59.170

/*


const http = require('http')

http.createServer(handleRequest).listen(8000)

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
////////////////////

/*
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(8000)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
})

handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
})

*/
////////////////////////

/*
ReactDOM.render(
    <h1>Hello, world...!</h1>,
    document.getElementById('root')
);
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

//tog BORT.. serviceWorker.unregister();

