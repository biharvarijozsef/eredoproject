var mongoose = require("mongoose");
var Promise = require("bluebird");

var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
        return findJobs({}).then(function(collection) {
            if(collection.length === 0) {
                return Promise.map(jobs, function(job) {
                    return createJob(job);
                });
            }
        });    
};

var jobs = [
        {title:'Cook', description:'You will be making bugles'},
        {title:'Waiter', description:'You will be putting food on peoples tables'},
        {title:'Programmer', description:'You will be mindlessly typing funny scripts'},
        {title:'Axe Maker', description:'You will be making mindlessly sharp axes'} 
];