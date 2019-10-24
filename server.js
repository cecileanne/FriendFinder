// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Patron Information (DATA)
// =============================================================
const friends = [
  {
    routeName: "hiddlestest",
    name: "Tom Hiddleston",
    photo: "",
    scores: []
  },
  {
    routeName: "ceciletest",
    name: "Cecile Test",
    photo: "",
    scores: []
  },
  {
    routeName: "",
    name: "",
    photo: "",
    scores: []
  }
];

// Routes
// =============================================================

// // Basic route that sends the user first to the AJAX Page
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "view.html"));
//   });

// Displays all friends
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Displays a selected friend, or returns false
app.get("/api/friends/:friend", function(req, res) {
  const chosen = req.params.character;

  console.log(chosen);

  for (var userHandle = 0; i < friends.length; userHandle++) {
    if (chosen === friends[userHandle].routeName) {
      return res.json(friends[userHandle]);
    }
  }

  return res.json(false);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
