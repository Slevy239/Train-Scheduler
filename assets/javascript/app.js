
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
  console.log(trainName)



  $("#submit").on("click", function(event) {
    event.preventDefault();
    trainName = $("#name-input").val();
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

    var now = moment().format('hh:mm a');
    var trainStart = childSnapshot.val().start;
    var timeRemaining = timeUntil % childSnapshot.val().trainFrequency;



    var nextTrain = childSnapshot.val().trainFrequency - timeUntil;
    var arrivalTime = moment().add(timeUntil, "minutes");
    console.log(trainName)

    //starttime = moment(childSmapshot.val().startTime, "hh:mm").subtract(1, "years");
    //timeDiff = difference between now and starttime
    //time remaining = diff/freq
    //min to arrival = freq - timeRemain
    //next train = moment + minTo arrival
    // var timeUntil = moment().diff(moment(trainStart, "X"), "minutes");
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>")
        );

        $("#train-table > tbody").append(newRow);

    
});

//arrival time
//time until next arrival -relative to current time
//function refresh every 60secs



