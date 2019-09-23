
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
//   var firstTrain = "";
  var frequency = 0;
//   var train = {
//       name: "",
//       destination: "",
//       first: "",
//       frequency: "",
//   }
  var now = moment().format("MM/YYYY");



  $("#submit").on("click", function() {
    event.preventDefault();
    // Storing and retreiving new train data
    trainName = $("#name-input").val();
    trainDestination = $("#destination-input").val();
    // trainFirst = $("#first-train").val();
    trainFrequency = $("#frequency-input").val();

    // Pushing to database
    database.ref().set({
        name: trainName,
        destination: trainDestination,
        // first: trainFirst,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("form")[0].reset();
});

database.ref().on("value", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    // var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName)
    console.log(trainDestination);
    // console.log(trainFirst);
    console.log(trainFrequency);

    // var currentTime = moment.unix(trainFirst).format("MM/DD/YYYY");
    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        // $("<td>").text(trainFirst),
        $("<td>").text(trainFrequency),
        // $("<td>").text(currentTime),
        );

        $("#train-table > tbody").append(newRow);

    
});


