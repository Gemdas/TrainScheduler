$(document).ready( function (){
	

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAM3CmpIxP42s7ZYzEpLqlaS-1qmFwLcEw",
    authDomain: "train-scheduler-6a3db.firebaseapp.com",
    databaseURL: "https://train-scheduler-6a3db.firebaseio.com",
    projectId: "train-scheduler-6a3db",
    storageBucket: "train-scheduler-6a3db.appspot.com",
    messagingSenderId: "176138119317"
  };
  firebase.initializeApp(config);

var database=firebase.database();
var date= new Date();

$('#search').on("click", function(){
	event.preventDefault();
	var name=$('#train-name').val().trim();
	var destination=$('#destination').val().trim();
	var firstTrain=$('#first').val().trim();
	var rate=$('#rate').val().trim();
//var monthsWorked=(date.month()); 

	database.ref().push({
	  	name,
  		destination,
  		firstTrain,
  		rate
        
     });
});
   database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());
	var tableRow=$('<tr>');

	var nameData=$('<td>');
	var destinationData=$('<td>');
	var startData=$('<td>');
	var rateData=$('<td>');
	var nextData=$('<td>');
	
	var date1 = new Date();

	date1.setUTCHours(parseInt(snapshot.val().firstTrain.substring(0,2))+5)
	console.log(date1.getUTCHours());
	date1.setUTCMinutes(parseInt(snapshot.val().firstTrain.substring(3)))
	console.log(date1.getUTCHours());
	console.log(date1);
	var timeDifference=moment(date).diff(date1, 'minutes')
	var monthsWorked = parseInt(snapshot.val().rate)-timeDifference%parseInt(snapshot.val().rate)-1
	//var monthsWorked=((date.getFullYear()-date1.getUTCFullYear())*12+date.getMonth()-date1.getUTCMonth()-1);
	date1.setUTCHours(date1.getUTCHours()+(timeDifference/60))
	date1.setUTCMinutes(date1.getUTCMinutes()+(timeDifference%60)+1)
	nameData.text(snapshot.val().name);
	destinationData.text(snapshot.val().destination);
	startData.text(snapshot.val().rate);
	rateData.text(moment(date1).format("HH:mm"));
	nextData.text(monthsWorked);


	tableRow.append(nameData);
	tableRow.append(destinationData);
	tableRow.append(startData);
	tableRow.append(rateData);
	tableRow.append(nextData);

	$("#tableBody").append(tableRow);
      
     
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });






});