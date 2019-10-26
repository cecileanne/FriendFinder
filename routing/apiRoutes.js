// LOAD DATA
const friends = require("../data/friends");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  // Displays a selected friend, or returns false
  app.get("/api/friends/:routeName", function(req, res) {
    const chosen = req.params.friend;
    //   console.log(chosen);
    for (var friend = 0; friend < friends.length; friend++) {
      if (chosen === friends[friend].routeName) {
        return res.json(friends[friend]);
      }
    }
    return res.json(false);
  });

  // POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

  // Create New Friend - takes in JSON input
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newFriend = req.body;
    // console.log(newFriend);
    // Using a RegEx Pattern to remove spaces from newFriend
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
    // console.log(newFriend);
    friends.push(newFriend);
    // res.json(newFriend);
    // ------------------------------------------------------------------

    // Determine the user's most compatible friend using the following as a guide:
    // console.log(newFriend.scores);
    // Declare besty (it will be the match)
    let besty;
    // Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
    friends.forEach(friend => {
      let diff = 0;
      friend.scores.forEach((score, index) => {
        diff += Math.abs(score - newFriend.scores[index]);
      });
      // let diffArray = [];
      // const friendScoreDiff = {`scoreDiff: ${diff}, friendName: ${friend.name}`}
      // diffArray.push(friendScoreDiff);
      //   let diffArray = [diff, friend.name];
      //   console.log(diffArray);
      //   sortedArray.push(diffArray)
      //   besty = sortedArray[0];
      //   console.log(`your best match is ${besty}`);

      // ------------------------------------------------------------------
      // SORT AND THEN IF PERSON's diff is smaller, they become the besty
      //best match will be index 0 of sortedFriends
      // console.log(besty)
    }); // closes for each

    // TO DO Once you've found the current user's most compatible friend, display the result as a modal pop-up.
    // TO DO The modal should display both the besty.name and besty.photo of the closest match.

    //   app.post("#modal1", function(req, res) {
    //   }
  }); // closes post
}; // closes function(app)
