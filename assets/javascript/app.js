
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

  var title = "";
  var trainDestination = "";
  var start = "";
  var trainFrequency = 0;



  $("#submit").on("click", function(event) {
    // event.preventDefault();
    title = $("#name-input").val();
    trainDestination = $("#destination-input").val();
    trainFrequency = $("#frequency-input").val();
    start = $("#first-input").val();

    // Pushing to database
    database.ref().push({
        title: title,
        trainDestination: trainDestination,
        trainFrequency: trainFrequency,
        start:start,
    });
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


    // var converted = moment(start, "hh:mm").subtract(1, "years")
    // var convertedUnix = converted.format("X");
    // var current = moment()
    // var currentUnix = current.format("X");
    // var difference = moment().diff(moment(converted), 'minutes');
    // var apart = difference % trainFrequency;
    // var timeTillNext = trainFrequency - apart;
    // var arrival = moment().add(timeTillNext, 'minutes');
    // var nextUnix = arrival.format("x");
    // var nextArrival = moment.unix(nextUnix).format("hh:mm");


    var startTimeConvert = moment(childSnapshot.val().start, "hh:mm").subtract(1, "years");
    var difference = moment().diff(moment(startTimeConvert), "minutes"); //showing the difference between now and the start input.
    var timeRemaining = difference % childSnapshot.val().trainFrequency;
    var nextToArrive =childSnapshot.val().trainFrequency - timeRemaining; //based on train frequency, it is subtracted by the time remaining to show the time until next train
    var next = moment().add(nextToArrive, "minutes") //adding current time to time remaing and reformatting
    
    var newRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().title),
        $("<td>").text(childSnapshot.val().trainDestination),
        $("<td>").text(childSnapshot.val().trainFrequency),
        $("<td>").text(moment(next).format("LT")),
        $("<td>").text(nextToArrive)
        );
        
        $("#train-table > tbody").append(newRow);


          (function () {
            function checkTime(i) {
                return (i < 10) ? "0" + i : i;
            }
        
            function startTime() {
                var today = new Date(),
                    h = checkTime(today.getHours()),
                    m = checkTime(today.getMinutes()),
                    s = checkTime(today.getSeconds());
                document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
                t = setTimeout(function () {
                    startTime()
                }, 500);
            }
            startTime();
        })();

      })
