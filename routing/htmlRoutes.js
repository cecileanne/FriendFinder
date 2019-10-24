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
app.get("/api/friends/:friendfullname", function(req, res) {
  const chosen = req.params.friend;
  //   console.log(chosen);
  for (var friend = 0; friend < friends.length; friend++) {
    if (chosen === friends[friend].routeName) {
      return res.json(friends[friend]);
    }
  }
  return res.json(false);
});

// TO DO: Add a friend from a form submission
// >> get from survey.html

// TO DO: Run the algorithm
