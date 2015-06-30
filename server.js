var express = require('express');
var jobModel = require("./models/Job");
var jobsData =  require("./jobs-data.js");

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs().then(function(collection) {
        res.send(collection);
    });
});
app.get('*', function(req, res){
  res.render('index');
});

//mongoose.connect('mongodb://localhost/eredoproject');
jobsData.connectDB('mongodb://jbiharva:1qay2wsx@ds043062.mongolab.com:43062/eredoproject')
.then(function() {
   console.log('connected to mongodb successfully!'); 
   jobsData.seedJobs();
});

// Note: Uses the CLOUD9 port
app.listen(process.env.PORT);