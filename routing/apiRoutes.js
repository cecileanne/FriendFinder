const friends = require("../data/friends");

// 4. Your `apiRoutes.js` file should contain two routes:
module.exports = function(app) {
  //    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
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

  //    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

  // Create New Friend - takes in JSON input
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newFriend = req.body;
    console.log(newFriend);
    // Using a RegEx Pattern to remove spaces from newFriend
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
    // console.log(newFriend);
    friends.push(newFriend);
    // res.json(newFriend);
    // 6. Determine the user's most compatible friend using the following as a guide:
    console.log(newFriend.scores);
    let besty;
    //    * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
    friends.forEach(friend => {
      let diff = 0;
      friend.scores.forEach((score, index) => {
        diff += Math.abs(score - newFriend.scores[index]);
      });
      console.log(friend.name, diff);
    });
    //    * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
    //      * Example:
    //        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
    //        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
    //        * Total Difference: **2 + 1 + 2 =** **_5_**
    //    * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
    //    * The closest match will be the user with the least amount of difference.

    // 7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
    //    * The modal should display both the name and picture of the closest match.
  });
};
// module.exports = apiRoutes;
