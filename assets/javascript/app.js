var config = {
    apiKey: "AIzaSyDHRkTtTcmL2vJn0f5n8ndPbOqF2r5ogps",
    authDomain: "train-2d48b.firebaseapp.com",
    databaseURL: "https://train-2d48b.firebaseio.com",
    projectId: "train-2d48b",
    storageBucket: "train-2d48b.appspot.com",
    messagingSenderId: "200361476463"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  var trName = $("#train-name-input").val().trim();
  var trDes = $("#destination-input").val().trim();
  var fTrain = moment($("#first-train-input").val().trim(), "HH:mm");
  console.log('first train input', fTrain);
  var freq = $("#rate-input").val().trim();

 
  var newTrain = {
    name: trName,
    destination: trDes,
    firstTrain: fTrain,
    frequency: freq
  };

 
  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#rate-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

//this is when it gets fuzzy
  var trName = childSnapshot.val().name;
  var trDes = childSnapshot.val().destination;
  var fTrain = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().frequency;


  console.log(trName);
  console.log(trDes);
  console.log(fTrain);
  console.log(freq);


  var fTrainPretty = moment.unix(fTrain).format("hh:mm");

 
  var trSched = moment().diff(moment(fTrain, "X"), "months");
  console.log(trSched);


  var minsA = trSched * freq;
  console.log(MinsA);


  var newRow = $("<tr>").append(
    $("<td>").text(trName),
    $("<td>").text(trDes),
    $("<td>").text(fTrainPretty),
    $("<td>").text(empMonths),
    $("<td>").text(freq),
    $("<td>").text(minsA)
  );

 
  $("#employee-table > tbody").append(newRow);
});
