function retrieveSubmitTimeList() {
  var orderedList = document.getElementById("ol2");
  var list = document.createElement('li');

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      if (xmlhttp.responseText) {
        var result = JSON.parse(xmlhttp.responseText);
        var studentList; 

        for(var i = 0; i < 5; i++){
          if (result[i]){
            var submitDate = new Date(result[i].submitTime);
            studentList = '<mark>' + result[i].studentName + ' (ID: ' + result[i].studentID + ')' + '</mark><br><small>Submitted on <b>' + submitDate.toDateString() + ', ' + submitDate.toLocaleTimeString() + '</b></small><br><small><b><i>Completed in ';
            var timeTakenInMin = result[i].submitTimeInMin;
            var timeTakenInSec = result[i].submitTimeInSec;

            if (timeTakenInMin > 60) {
              var hours = Math.floor(timeTakenInMin / 60) + ' hours : ';
              var minutes = hours + Math.floor(timeTakenInMin % 60) + ' minutes : ';
              var seconds = minutes + Math.floor(timeTakenInSec % 60) + ' seconds</i></b></small>';
              studentList += seconds;
            }
            else if (timeTakenInMin) {
              var minutes = Math.floor(timeTakenInSec / 60) + ' minutes : ';
              var seconds = minutes + timeTakenInSec % 60 + ' seconds</i></b></small>';
              studentList += seconds;
            }
            else {
              studentList = studentList + timeTakenInSec + ' seconds</i></b></small>';
            }
            list.innerHTML = studentList;
            orderedList.appendChild(list);
            list = document.createElement('li');
          }
        }          //sampleId.innerHTML += result.length;
      }
      else {
        list.innerHTML = '<center><mark><strong>No Submissions yet!.. :(</strong></mark></center>';
        orderedList.appendChild(list);
      }
    }
  }

  xmlhttp.open("GET", "/showSubmitTimeList", true);
  xmlhttp.send();
  xmlhttp.onerror = () => {
    alert('Connection Failed!...Please Check Your Internet Connection');
  }
}


function retrieveSubmitList() {
  var orderedList = document.getElementById("ol");
  var list = document.createElement('li');
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      if (xmlhttp.responseText) {
        var result = JSON.parse(xmlhttp.responseText);
        var studentList; 
        var className = '<center>' + '<h2>' + result[0].className + '</h2>' + '</center>';
        var assignmentName = '<center><h3>' + result[0].assignmentName + '</h3></center>';
        document.getElementById('className').innerHTML = className;
        document.getElementById('assignmentName').innerHTML = assignmentName;
      
        for(var i = 0; i < 5; i++){
          if (result[i]){
            var submitDate = new Date(result[i].submitTime);
            studentList = /*result[i].assignmentName + '<br>' +*/'<mark>' + result[i].studentName + ' (ID: ' + result[i].studentID + ')' + '</mark><br><small>Submitted on <b>' + submitDate.toDateString() + ', ' + submitDate.toLocaleTimeString() + '</b></small><br><small><b><i>Completed in ';
            var timeTakenInMin = result[i].submitTimeInMin;
            var timeTakenInSec = result[i].submitTimeInSec;

            if (timeTakenInMin > 60) {
              var hours = Math.floor(timeTakenInMin / 60) + ' hours : ';
              var minutes = hours + Math.floor(timeTakenInMin % 60) + ' minutes : ';
              var seconds = minutes + Math.floor(timeTakenInSec % 60) + ' seconds</i></b></small>';
              studentList += seconds;
            }
            else if (timeTakenInMin) {
              var minutes = Math.floor(timeTakenInSec / 60) + ' minutes : ';
              var seconds = minutes + timeTakenInSec % 60 + ' seconds</i></b></small>';
              studentList += seconds;
            }
            else {
              studentList = studentList + timeTakenInSec + ' seconds</i></b></small>';
            }
            list.innerHTML = studentList;
            orderedList.appendChild(list);
            list = document.createElement('li');
          }
        }          //sampleId.innerHTML += result.length;
      }
      else {
        list.innerHTML = '<center><mark><strong>No Submissions yet!.. :(</strong></mark></center>';
        orderedList.appendChild(list);
      }
    }
  }

  xmlhttp.open("GET", "/showSubmitList", true);
  xmlhttp.send();
  xmlhttp.onerror = () => {
    alert('Connection Failed!...Please Check Your Internet Connection');
  }
}



function retrieveAssignments() {
  var xmlhttp = new XMLHttpRequest();
  var dataList = document.getElementById('json-datalist');
  var input = document.getElementById("assignments");
  xmlhttp.onreadystatechange = () => {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      if (xmlhttp.responseText) {
        var result = JSON.parse(xmlhttp.responseText);
        //console.log(result);
        for (var i = 0; i < result.length; i++){
          var option = document.createElement("option");
          option.value = result[i].name;
          dataList.appendChild(option);
        }
        input.placeholder = "Search assignments...";
      }
    }
  }

  input.placeholder = "Loading options...";
  xmlhttp.open("GET", "/assignments", true);
  xmlhttp.send();
  xmlhttp.onerror = () => {
    alert('Connection Failed!...Please Check Your Internet Connection');
  }

}

function viewStudentList() {
  retrieveSubmitList();  
  retrieveSubmitTimeList();
  retrieveAssignments();
  setTimeout(function() {
  location.reload();
  }, 20000);
}


