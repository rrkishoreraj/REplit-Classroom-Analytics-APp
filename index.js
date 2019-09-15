const express = require('express');
const bodyParser = require('body-parser');
//const fs = require('fs');
var mongoose = require('mongoose');
var dbSchema = require('./models/dbschema.js');

var dbmodel;
var collectionsList = [];

mongoose.connect('mongodb+srv://'+process.env.USERNAME+':'+process.env.PASSWORD+'@cluster0-i73d8.mongodb.net/test?retryWrites=true&w=majority');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});


app.post('/submit', (req, res) => {
  console.log('RECEIVED WEBHOOK EVENT:')
  console.log('----------------')
	console.log(req.body);
  
  var code = req.body.submission.files[0].content;
  /*fs.writeFile('code.txt', code, (err) => {
    if (err)
      console.log(err);
  });*/

  console.log('Updating Database...');


  if (req.body.submission.status == 'complete') {
    
    dbmodel = mongoose.model(req.body.assignment.name, dbSchema);

    //dbmodel = mongoose.model('1234', dbSchema);

    var newdbModel = new dbmodel();
    //var newdbSchema = new dbSchema()
    newdbModel.assignmentID = req.body.assignment.id;
    newdbModel.assignmentName = req.body.assignment.name;
    newdbModel.classroomID = req.body.classroom.id;
    newdbModel.className = req.body.classroom.name;
    newdbModel.submissionID = req.body.submission.id;
    newdbModel.submissionStatus = req.body.submission.status;
    newdbModel.startTime = req.body.submission.time_created;
    newdbModel.submitTime = req.body.submission.time_submitted;
    newdbModel.studentID = req.body.student.id;
    newdbModel.studentName = req.body.student.first_name + req.body.student.last_name;
    newdbModel.studentEmail = req.body.student.email;
    newdbModel.program = code;

    var start = new Date(req.body.submission.time_created);
    var end = new Date(req.body.submission.time_submitted);
    var diff = end - start;
    newdbModel.submitTimeInMin = Math.floor(diff / 60e3);   //minutes
    newdbModel.submitTimeInSec = Math.floor(diff / 1e3);             //seconds


    newdbModel.save((err, saved) => {
      if (saved){
        console.log('Document Saved Successfully!');
      }
      else{
        console.log(err);
      }
    });
  
  }
  else {
    console.log(req.body.student.first_name + req.body.student.last_name + ' has not completed the assignment.');
  }

/*
  collectionsList = [];
  mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log(names); // [{ name: 'dbname.myCollection' }]
      //module.exports.Collection = names;
      collectionsList = names;
      console.log(collectionsList.length);
  });
*/


  res.status(200).send()
});


app.get('/showSubmitList', (req, res) => {
  if (!dbmodel) {
    res.status(200).send(undefined);
  }
  else {
    dbmodel.find({}, (err, result) => {
      if (err){
        console.log(err);
      }
      else{
        //console.log(result);
        res.status(200).send(result);
      }
    });
  }
});



app.get('/showSubmitTimeList', (req, res) => {
  var sortedSubmitTimeInSec = {submitTimeInSec: 1};
  if (!dbmodel) {
    res.status(200).send(undefined);
  }
  else {
    dbmodel.find({}, (err, result) => {
            if (err) {
                console.log("error query");
            } 
            else {
                //console.log(result);
                res.status(200).send(result);
            }
        }).sort(sortedSubmitTimeInSec);
  }
});


app.get('/assignments', (req, res) => {

  try {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        //module.exports.Collection = names;
        collectionsList = names;
        console.log(collectionsList.length);
    });
  }
  catch (err) {
    console.log(err.message);
  }
  

  res.status(200).send(collectionsList);

});


app.post('/viewAssignments', (req, res) => {
  dbmodel = mongoose.model(req.body.assignments, dbSchema);
  res.redirect('/');
});



app.listen(process.env.PORT, () => console.log('server started'));