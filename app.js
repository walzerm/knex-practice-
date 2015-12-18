var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var knex = require('./db/knex');
require('locus');
var methodOverride = require('method-override')

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/students', function(req, res) {
    knex('students').then(function(students) {
        res.render('index', {students: students});
    })
})

app.get('/students/new', function(req, res) {
    res.render('new');
})

app.post('/students', function(req, res) {
    knex('students').insert({name: req.body.new}).then(function() {
        res.redirect('/students');
    })
})

app.get('/students/:id/edit', function(req, res) {
    //find a student
    var id = req.params.id;
    knex('students').where({id: id}).first().then(function(student) {
        //render edit.ejs and pass into it the student found
        //eval(locus);
        res.render('edit', {student: student});
    })
})

app.put('students/:id', function() {
    //use knex to update student and redirect to /students
    
})

app.listen(3000, function() {
    console.log('But in the end, it didnt even maaaaaaaaaater...');
})
