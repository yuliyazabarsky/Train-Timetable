var config = {
    apiKey: "AIzaSyAdNMPCmr8_EJtQg5H8CEivswn4j__iI_A",
    authDomain: "train-timetable-c43fc.firebaseapp.com",
    databaseURL: "https://train-timetable-c43fc.firebaseio.com",
    projectId: "train-timetable-c43fc",
    storageBucket: "train-timetable-c43fc.appspot.com",
    messagingSenderId: "575243105022"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime;
var frequency;

//capture submit click 
$("#userSubmit").on("click", function (event) {
    event.preventDefault();

    // Grab values from input boxes 
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        datedAdded: firebase.database.ServerValue.TIMESTAMP
    });
    // Clear inputs 
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
});
//firebase listener 
database.ref().on("child_added", function (snapshot) {



    var trainNameDispaly = $("<td>" + snapshot.val().trainName + "</td>")
    var destinationDispaly = $("<td>" + snapshot.val().destination + "</td>");
    var frequencyDispaly = $("<td>" + snapshot.val().frequency + "</td>");
    var nextArrivalDispaly = $("<td>");
    var minutesAwayDispaly = $("<td>")

    var newRow = $("<tr>");

    newRow.append(trainNameDispaly, destinationDispaly, frequencyDispaly, nextArrivalDispaly, minutesAwayDispaly);

    $("tbody").append(newRow);
    console.log(snapshot.val());
})


// var tFrequency = frequency.unix();

// // Time is 3:30 AM
// var firstTime = "03:30";

// // First Time (pushed back 1 year to make sure it comes before current time)
// //FYI: you'd also be okay just dialing it back 1 day instead... 
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);



// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));