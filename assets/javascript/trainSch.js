// Link to Firebase
var clickData = new Firebase("https://mike123-trainsch.firebaseio.com/");
//https://mike123-trainsch.firebaseio.com/#-KJILw2nVxsIdwx0k8F5|0075578bd0f4386061993efbbd5edacd

//var clickData = new Firebase("https://flickering-heat-7798.firebaseio.com/");

$(document).on("click", '#addInput', function() {
	var trainNameEntered = $('#trainName').val().trim();
	var destinationEntered = $('#destination').val().trim();
	var frequencyEntered = $('#frequency').val().trim();
	var nextArrivalEntered = $('#nextArrival').val().trim();
	console.log("List of things: " + trainNameEntered+ " " + destinationEntered+ " "  + frequencyEntered+ " "  + nextArrivalEntered);

	clickData.push({
		"trainNameFB": trainNameEntered,
		"destinationFB": destinationEntered,
		"frequencyFB": frequencyEntered,
		"nextArrivalFB": nextArrivalEntered
	})

  //clear the entry form
	trainNameEntered = $('#trainName').val("");
	destinationEntered = $('#destination').val("");
	frequencyEntered = $('#frequency').val("");
	nextArrivalEntered = $('#nextArrival').val("");
	return false;
});

clickData.on("child_added", function(childSnapshot){
	var trainNameAppend = childSnapshot.val().trainNameFB;
	var destinationAppend = childSnapshot.val().destinationFB;
	var frequencyAppend = childSnapshot.val().frequencyFB;
	var nextArrivalAppend = childSnapshot.val().nextArrivalFB;
	/*var momentMonths = moment(new Date(appendDate));
	var currentMoment = moment();
	var howManyMonths = moment().diff(momentMonths, "months");
	var howMuchPaid = howManyMonths * childSnapshot.val().rateGivenFB;
	console.log(howManyMonths + " This is the months");
	console.log(appendName);*/
	$('#trainSchTable').prepend("<tr><td>" + trainNameAppend + "</td><td>" + destinationAppend + "</td><td>" +  frequencyAppend + "</td><td>" +  nextArrivalAppend + "</td></tr>");

});


///dateAdded: Firebase.ServerValue.TIMESTAMP
//.on('child_added', function() {});

