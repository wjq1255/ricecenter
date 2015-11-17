var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.end();
});


router.get('/test', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.end();
  res.end('server is running!');
});

module.exports = router;
