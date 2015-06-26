var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    title:{type:String},
    description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
    Job.find({}).exec(function(error, collection) {
        if(collection.length === 0) {
            Job.create({title:'Cook', description:'You will be making bugles'});
            Job.create({title:'Waiter', description:'You will be putting food on peoples tables'});
            Job.create({title:'Programmer', description:'You will be mindlessly typing funny scripts'});
            Job.create({title:'Axe Maker', description:'You will be making mindlessly sharp axes'});
        }
    })
}