var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var knex = require('./db/knex');

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get('/students', function(req, res) {
    knex('students').then(function(students) {
        res.render('index', {students: students});
    })
})

app.get('/students/new', function(req, res) {
    res.render('new');
})

app.post('/students', function(req, res) {
    console.log(req.body);
    knex('students').insert({name: req.body.new}).then(function() {
        res.redirect('/students');
    })

})


app.listen(3000, function() {
    console.log('But in the end, it didnt even maaaaaaaaaater...');
})
