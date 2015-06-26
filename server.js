var express = require('express');
var mongoose = require("mongoose");
var jobModel = require("./models/Job");
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));



app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(error, collection) {
        res.send(collection);
    })
});
app.get('*', function(req, res){
  res.render('index');
});

//mongoose.connect('mongodb://localhost/eredoproject');
mongoose.connect('mongodb://jbiharva:1qay2wsx@ds043062.mongolab.com:43062/eredoproject');


var con = mongoose.connection;

con.once('open', function() {
   console.log('connected to mongodb successfully!'); 
   jobModel.seedJobs();
});
// Note: Uses the CLOUD9 port
app.listen(process.env.PORT);