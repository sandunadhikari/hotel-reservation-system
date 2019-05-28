var express = require('express');
var router = express.Router();
var connection = require('../config/connection');
var alert  = require('alert-node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/loginUser', function(req, res, next) {
    var username = req.body.uname;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM login WHERE usname = ? AND pass = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                alert('howdy');
                // res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.alert('Please enter Username and Password!')
        // alert('Please enter Username and Password!');
        // res.send('Please enter Username and Password!');
        res.end();
    }
});

router.get('/home', function(req, res, next) {
    res.render('AdminHome');
});

module.exports = router;
