var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobModel = require("./models/Job");

var Job = jobModel.model;

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};
var createJob = Promise.promisify(Job.create, Job);


var seedJobs = [
        {title:'Cook', description:'You will be making bugles'},
        {title:'Waiter', description:'You will be putting food on peoples tables'},
        {title:'Programmer', description:'You will be mindlessly typing funny scripts'},
        {title:'Axe Maker', description:'You will be making mindlessly sharp axes'} 
];

//exports

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.saveJob = createJob;

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        if(collection.length === 0) {
            return Promise.map(seedJobs, function(job) {
                return createJob(job);
            });
        }
    });    
};