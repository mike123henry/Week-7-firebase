// Link to Firebase
var clickData = new Firebase("https://mike123-trainsch.firebaseio.com/");
var startTime;
//https://mike123-trainsch.firebaseio.com/#-KJILw2nVxsIdwx0k8F5|0075578bd0f4386061993efbbd5edacd

//var clickData = new Firebase("https://flickering-heat-7798.firebaseio.com/");

$(document).on("click", '#addInput', function() {
	var trainNameEntered = $('#trainName').val().trim();
	var destinationEntered = $('#destination').val().trim();
	var frequencyEntered = $('#frequency').val().trim();
	var firstTrainDpartEntered = $('#firstTrainDpartTime').val().trim();
	console.log("List of things: " + trainNameEntered+ " " + destinationEntered+ " "  + frequencyEntered+ " "  + firstTrainDpartEntered);

var tmp=firstTrainDpartEntered.split(":");
startTime = new moment({hours:tmp[0], minutes:tmp[1]});
console.log(startTime);
//  var startTime = moment() + firstTrainDpartEntered;
//    console.log(startTime);

	clickData.push({
		"trainNameFB": trainNameEntered,
		"destinationFB": destinationEntered,
		"frequencyFB": frequencyEntered
	})
//"firstTrainDpartFB": startTime

  //clear the entry form
	trainNameEntered = $('#trainName').val("");
	destinationEntered = $('#destination').val("");
	frequencyEntered = $('#frequency').val("");
	firstTrainDpartEntered = $('#firstTrainDpartTime').val("");
	return false;
});

clickData.on("child_added", function(childSnapshot){
	var trainNameAppend = childSnapshot.val().trainNameFB;
	var destinationAppend = childSnapshot.val().destinationFB;
	var frequencyAppend = childSnapshot.val().frequencyFB;
	var howManyMinutes = moment().diff(startTime, "minutes");
	console.log(moment());
	console.log(howManyMinutes);
  //var currentMoment = moment();
  //var startMoment = moment(new firstTrainDpartEntered);
	//var nextArrivalAppend = childSnapshot.val().nextArrivalFB;

	/*var momentMonths = moment(new Date(appendDate));
	var currentMoment = moment();
	var howManyMonths = moment().diff(startTime, "minutes");
	var howMuchPaid = howManyMonths * childSnapshot.val().rateGivenFB;
	console.log(howManyMonths + " This is the months");
	console.log(appendName);*/
	$('#trainSchTable').prepend("<tr><td>" + trainNameAppend + "</td><td>" + destinationAppend + "</td><td>" +  frequencyAppend + "</td><td>" +  howManyMinutes + "</td></tr>");

});


///dateAdded: Firebase.ServerValue.TIMESTAMP
//.on('child_added', function() {});

