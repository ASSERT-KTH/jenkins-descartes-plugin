var express = require('express');
var mongoDb = require('mongodb');
var app = express();

init();

function init() {
    if (mongoDb.isConnected()) {
      app.listen(27017, '127.0.0.1');
    }
    else {
      console.log('error');
    }
}
