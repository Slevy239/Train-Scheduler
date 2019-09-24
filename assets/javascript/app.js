
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

  var name = "";
  var destination = "";
  var start = "";
  var frequency = 0;



  $("#submit").on("click", function() {
    event.preventDefault();
    trainName = $("#name-input").val();
    destination = $("#destination-input").val();
    frequency = $("#frequency-input").val();
    startTime = $("#first-input").val();

    // Pushing to database
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFrequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;

    //starttime = moment(childSmapshot.val().startTime, "hh:mm").subtract(1, "years");
    //timeDiff = difference between now and starttime
    //time remaining = diff/freq
    //min to arrival = freq - timeRemain
    //next train = moment + minTo arrival


    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        );

        $("#train-table > tbody").append(newRow);

    
});

//arrival time
//time until next arrival -relative to current time
//function refresh every 60secs



