// server.js
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router
router.get('/', function(req, res) {                        
  console.log('req ' + req.ref);
  res.status(200).json({ message: 'success' });   
});
router.get('/taskValidation', function(req, res) {
  // do something useful here. until then always succeed
  res.status(200).json({ message: 'success' });   
});
router.get('/taskValidationRandomFail', function(req, res) {
  // randomly fail 50% of the time
  var n = Math.floor(Math.random()*100) < 50;
  if(Math.floor(Math.random()*10) > 5) {
    res.status(400).json({ message: 'fail' });   
  } else {
    res.status(200).json({ message: 'success'});   
  }
});
router.get('/taskValidationAlwaysSucceed', function(req, res) {
  res.status(200).json({ message: 'success' });   
});
router.get('/taskValidationAlwaysFail', function(req, res) {
  res.status(400).json({ message: 'fail' });   
});

app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Running. Listen port: ' + port);
