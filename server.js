var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;

var app = express();



app.listen(port, function() {
  console.log('port ' + port + ' is listening');
});
