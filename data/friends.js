// Patron Information (DATA)
// =============================================================
const friends = [
  {
    routeName: "hiddlestontest",
    name: "Tom Hiddleston",
    photo:
      "https://vets-now.s3.amazonaws.com/uploads/2017/01/Common-emergencies-in-kittens-Vets-Now.jpg",
    scores: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
  },
  {
    routeName: "ceciletest",
    name: "Cecile Test",
    photo:
      "https://images.squarespace-cdn.com/content/v1/54783cdfe4b01e4f655402fe/1555886601401-2UY4D2OHYV364VZQVORJ/ke17ZwdGBToddI8pDm48kPhHxtcpGgap4PQD1FcyZ1x7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UaFsru5sGf4oPSOSpKc9ujvSC7N5T9OAILgZUPgD0wGABltQNugx0IX_zMvsek3f7g/singapore-ragdoll-kitten-guide.jpg",
    scores: [5, 5, 4, 4, 3, 3, 2, 2, 1, 1]
  },
  {
    routeName: "brittneytest",
    name: "Brittney Test",
    photo:
      "https://kittenrescue.org/wp-content/uploads/2016/11/KittenRescue_WhyAdoptaKitten.jpg",
    scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  },
  {
    routeName: "saltest",
    name: "Sal Test",
    photo: "https://www.onetail.org/wp-content/uploads/2018/04/mustard.jpg",
    scores: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  },
  {
    routeName: "nicktest",
    name: "Nick Test",
    photo:
      "https://pbs.twimg.com/profile_images/756320100483858432/OX50XkO_.jpg",
    scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  },
  {
    routeName: "beautest",
    name: "Beau Test",
    photo:
      "https://media1.popsugar-assets.com/files/thumbor/oWF0qFqROBPQ2I6FeG9VPkbmj5I/1053x0:5069x4016/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/06/21/651/n/24155406/70a17c2a5d0cebcdab2037.85894139_/i/Photos-Kittens.jpg",
    scores: [3, 2, 3, 2, 3, 2, 3, 2, 3, 2]
  },
  {
    routeName: "sabztest",
    name: "Sabz Test",
    photo:
      "https://scrumbles.co.uk/wp-content/uploads/2018/12/lets-talk-about-kitten-food.jpg",
    scores: [3, 3, 3, 4, 4, 4, 4, 3, 3, 3]
  },
  {
    routeName: "seantest",
    name: "Sean Test",
    photo:
      "http://annarborcatclinic.com/wp-content/uploads/2019/08/Kittens-3.jpg",
    scores: [3, 3, 3, 3, 2, 2, 3, 3, 3, 3]
  }
];

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
// >> post from survey.html

// Create New Friend - takes in JSON input
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newFriend = req.body;

  // Using a RegEx Pattern to remove spaces from newFriend
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
  // console.log(newFriend);
  friends.push(newFriend);
  res.json(newFriend);
});

// 6. Determine the user's most compatible friend using the following as a guide:

//    * Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
//    * With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
//      * Example:
//        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//        * Total Difference: **2 + 1 + 2 =** **_5_**
//    * Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both `5-3` and `3-5` as `2`, and so on.
//    * The closest match will be the user with the least amount of difference.

// 7. Once you've found the current user's most compatible friend, display the result as a modal pop-up.
//    * The modal should display both the name and picture of the closest match.
