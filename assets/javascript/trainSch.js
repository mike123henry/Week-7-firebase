$(document).ready(function() {
	// Link to Firebase
	var clickData = new Firebase("https://mike123-trainsch.firebaseio.com/");

	//get data from the form if the submit button is pushed
	$(document).on("click", '#adminInput', function() {
		var trainNameEntered = $('#trainName').val().trim();
		var destinationEntered = $('#destination').val().trim();
		var frequencyEntered = $('#frequency').val().trim();
		var firstTrainDpartEntered = $('#firstTrainDpartTime').val().trim();
		//push the data to firebase
		clickData.push({
			"trainNameFB": trainNameEntered,
			"destinationFB": destinationEntered,
			"frequencyFB": frequencyEntered,
			"firstTrainDpartFB": firstTrainDpartEntered,
		})

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
		var firstDepart = childSnapshot.val().firstTrainDpartFB;
		var firstTrainMath = moment(firstDepart,"hh:mm");
		var howManyMinutesElasped = moment().diff(firstTrainMath, "minutes");
		var minToNextTrain;
		//fix for the way % works for the first train to run
		// 2 divided by 5 = 0 with a remainder of 2
		//i.e. 2 % 5 = 2 but the train would actually be 3 min away so
		if (howManyMinutesElasped - frequencyAppend <0 ) {
			minToNextTrain = frequencyAppend - howManyMinutesElasped;
		}
		else{
			// the time elasped is more that 1 train interval and modulas works as expected
			//the modulas remainder is the minutes since the last train ran so subtract it from the frequency to get the time to the next train
			minToNextTrain = frequencyAppend -(howManyMinutesElasped % frequencyAppend);
		}
		var nextTime1 =  moment().add(minToNextTrain, "minutes");
		var nextTime = moment(nextTime1).format("LT");
		var lastUpdate = moment().format("LT");
		if (trainNameAppend === undefined || destinationAppend === undefined || frequencyAppend === undefined || nextTime === undefined || minToNextTrain === undefined ) {
			//if all data is not present do nothing
		}
		else{
			$('#trainSchTable').prepend("<tr class='tDataRow'><td class='tdata'>" + trainNameAppend + "</td><td class='tdata'>" + destinationAppend + "</td class='tdata'><td>" +  frequencyAppend + "</td><td class='tdata'>" +  nextTime + "</td><td class='tdata'>" +  minToNextTrain + "</td class='tdata'><td class='tdata'>" + lastUpdate + "</td class='tdata'></tr>");
		}
	}); //end on("child_added"

})// end document).ready()