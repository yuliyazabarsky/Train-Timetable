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
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = $("#firstTrainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    if (trainName || destination || firstTrainTime || frequency === "") {
        return false;
    } else {
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            datedAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }
    // Clear inputs 
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
});
//firebase listener 
database.ref().on("child_added", function (snapshot) {

    var tFrequency = snapshot.val().frequency;
    console.log("TF: " + tFrequency);
    var firstTime = snapshot.val().firstTrainTime;
    console.log("FT: " + firstTime);

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);



    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var trainNameDispaly = $("<td>" + snapshot.val().trainName + "</td>")
    var destinationDispaly = $("<td>" + snapshot.val().destination + "</td>");
    var frequencyDispaly = $("<td>" + snapshot.val().frequency + "</td>");
    var nextArrivalDispaly = $("<td>" + nextTrain + "</td>");
    var minutesAwayDispaly = $("<td>" + tMinutesTillTrain + "</td>");

    var newRow = $("<tr>");

    newRow.append(trainNameDispaly, destinationDispaly, frequencyDispaly, nextArrivalDispaly, minutesAwayDispaly);

    $("tbody").append(newRow);
    console.log(snapshot.val());
})