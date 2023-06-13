const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Functions and Storage
const generateRandomString = function() {
  return Math.floor((1 + Math.random()) * 0x10000000).toString(16).substring(1);
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// ******************************* */

//x
app.get("/", (req, res) => {
  res.send("Hello!");
});

//x
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

//x
app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

//Renders: INDEX.ejs
app.get("/urls", (request, response) => {
  const templateVars = { urls: urlDatabase};
  response.render("urls_index", templateVars);
});

//Renders: NEW.ejs
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//Renders: SHOW.ejs
app.get("/urls/:id", (request, response) => {
  const templateVars = {id: request.params.id, longURL: "http://www.lighthouselabs".ca};
  response.render("urls_show", templateVars);
});

// ************  MINE  ******************* */

//Makes Key(shortURL) : Value(longURL) & adds to urlDatabase
app.post("/urls", (request, response) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = request.body.longURL;
  response.redirect(`/urls/${shortURL}`);
  
  console.log(shortURL), console.log(urlDatabase);
});

//Redirects from /u/:id to actual site.
app.get("/u/:id", (req, res) => {
  // console.log(urlDatabase[req.params.id]);
  const longURL = urlDatabase[req.params.id];
  console.log(longURL);
  res.redirect(`http://${longURL}`);
});

//Delete
app.post("/urls/:id/delete", (request, res) => {
  console.log(`Deleted ${urlDatabase[request.params.id]}`);
  delete urlDatabase[request.params.id];
  console.log(urlDatabase);
  res.redirect("/urls");
});

//Edit
app.post("/urls/:id/edit", (req, res) => {
  console.log(`Editing: ${req.params.id} : ${urlDatabase[req.params.id]}`);

  // targets with shortURL and updates longURL

  console.log(urlDatabase);
  res.redirect("/urls/");
});



//Listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});






// const urlDatabase = {
//     "b2xVn2": "http://www.lighthouselabs.ca",
//     "9sm5xK": "http://www.google.com"
// };'





// const user1 = {
//   id: 1,
//   name: "Pequeno pollo de la pampa",
//   email: "pock@pock.com",
//   location: "Pampa",
// };

// // /users/2
// const user2 = {
//   id: 2,
//   name: "Bob the Bass",
//   email: "glub@glub.com",
//   location: "A river near you",
// };

// const users = {
//   1: user1,
//   2: user2,
// };

// app.get("/", (req, res) => {
//   return res.send("Request received");
// });

// // Wildcards!
// // Placeholder

// const fetchUserById = (userId) => {
//   if (users[userId]) {
//     return users[userId];
//   }

//   return "This is not a valid user id";
// };

// app.get("/users/:user_id", (req, res) => {
//   // const user_id = req.params.user_id;
//   const { user_id } = req.params;

//   console.log(user_id);

//   const currentUser = fetchUserById(user_id);
//   return res.json(currentUser);
// });