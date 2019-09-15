var mongoose = require('mongoose');

var schema = mongoose.Schema({
  assignmentID: Number,
  assignmentName: String,
  classroomID: Number,
  className: String,
  submissionID: Number,
  submissionStatus: String,  
  startTime: Date,
  submitTime: Date,
  submitTimeInMin: Number,
  submitTimeInSec: Number,
  studentID: Number,
  studentName: String,
  studentEmail: String,
  program: String
});

//var dbmodel = mongoose.model('sampleCollection', schema);
module.exports = schema; 
