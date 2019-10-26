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

  //   // Displays a single character, or returns false - don't need
  //   app.get("/api/friends/:routeName", function(req, res) {
  //     let chosen = req.params.friend;
  //     console.log(chosen);
  //     for (let friendInd = 0; friendInd < friends.length; friendInd++) {
  //       if (chosen === friends[friendInd].routeName) {
  //         return res.json(friends[friendInd]);
  //       }
  //     }
  //     return res.json(false);
  //   });

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
    // ------------------------------------------------------------------

    // Determine the user's most compatible friend using the following as a guide:
    // console.log(newFriend.scores);
    // Declare besty (it will be the match)
    let besty;
    let diffArray = [];
    // Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
    friends.forEach(friend => {
      let diff = 0;
      friend.scores.forEach((score, index) => {
        diff += Math.abs(score - newFriend.scores[index]);
      }); // closes friendscore for each
      let sortedFriend = friend.name;
      let diffObject = { diff, sortedFriend };
      diffArray.push(diffObject);
      //   console.log(diffArray);
    }); // closes for each

    // ------------------------------------------------------------------
    // SORT
    let sortedArray = diffArray.sort(function(a, b) {
      return a.diff - b.diff;
    });
    // console.log(sortedArray);
    //best match will be index 0 of sortedFriends
    // console.log(besty)
    besty = sortedArray[0].sortedFriend;
    bestyRoute = besty.replace(/\s+/g, "").toLowerCase();

    console.log(`your best match is ${besty}`);
    console.log(`bestyRoute is ${bestyRoute}`);

    // find the besty's photo by using the bestyRoute where it is the same as the routeName of that friend
    const friendsIndex = friends.findIndex(
      friend => friend.routeName === bestyRoute
    );
    //   console.log(index);
    //   console.log(friends[index]);
    console.log(`bestyPhoto is ${friends[friendsIndex].photo}`);

    // TO DO Once you've found the current user's most compatible friend, display the result as a modal pop-up.
    // ------------------------ ADDING DATA FOR BESTY -----------------
    // app.post(`/api/friend/${bestyRoute}`, res.json(data) => console.log("this" + data));
    // console.log(data.name);
    // console.log(data.photo);

    // TO DO The modal should display both the besty.name and besty.photo of the closest match.
    //   app.post("#modal1", function(req, res) {
    //   }

    // now that the person has a besty, add them to the list of people in friends
    friends.push(newFriend);
    // res.json(newFriend);
  }); // closes post
}; // closes function(app)
