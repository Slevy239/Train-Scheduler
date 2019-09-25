
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDdUMGh991c9QTYLMxei6dvW4d8J6n21dg",
    authDomain: "train-scheduler-80463.firebaseapp.com",
    databaseURL: "https://train-scheduler-80463.firebaseio.com",
    projectId: "train-scheduler-80463",
    storageBucket: "",
    messagingSenderId: "9865830670",
    appId: "1:9865830670:web:93e8423e72dca6b310775f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var start = "";
  var trainFrequency = 0;



  $("#submit").on("click", function(event) {
    event.preventDefault();
    nameInput = $("#name-input").val();
    trainDestination = $("#destination-input").val();
    trainFrequency = $("#frequency-input").val();
    start = $("#first-input").val();

    // Pushing to database
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFrequency: trainFrequency,
        start:start,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function(childSnapshot) {


    var converted = moment(childSnapshot.val().start, "hh:mm").subtract(1, "years");
    var difference = moment().diff(moment(converted), "minutes");
    var timeRemaining = difference % childSnapshot.val().trainFrequency;
    var minToArrival =childSnapshot.val().trainFrequency - timeRemaining;
    var next = moment().add(timeRemaining, "minutes").format("hh:mm a");
    var trainStart = childSnapshot.val().start;





    
    var newRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(next),
        $("<td>").text(minToArrival),
        );

        $("#train-table > tbody").append(newRow);

    
});

//arrival time
//time until next arrival -relative to current time
//function refresh every 60secs



