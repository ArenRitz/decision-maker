// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
// const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const {createPoll, getPoll} = require("./db/helper/polls")

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//mailgun client/connection setup
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const API_KEY = process.env.API_KEY;

const mailClient = mailgun.client({username: 'api', key: API_KEY});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   "/styles",
//   sassMiddleware({
//     source: __dirname + "/styles",
//     destination: __dirname + "/public/styles",
//     isSass: false, // false => scss, true => sass
//   })
// );

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const createRoutes = require("./routes/create");
const resultsRoutes = require("./routes/results");
const submitRoutes = require("./routes/submit");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/create", createRoutes(db, mailClient));
app.use("/results", resultsRoutes(db));
app.use("/submit", submitRoutes(db, mailClient));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



// const messageData = {
//   from: 'Decision Maker<admin@decision-maker.com>',
//   to: 'archana.agrawal3@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// };

//   client.messages.create(DOMAIN, messageData)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
/*
createPoll(db, {
  creatorName: "Archana Agrawal",
  creatorEmail: "archana.agrawal3@gmail.com",
  title: "Where to eat tonight?",
  description: "It's Poppy's birthday party!!!",
  isNameRequired: true,
  choices:[
    {
      title: "The grand mehfil",
      description: "Indian fine dining"
    },
    {
      title: "Quesada",
      description: "Mexican Fast Food"
    },
    {
      title: "Wildcraft",
      description: "PUB FOOD!!!"
    },
    {
      title: "Ennio's Pasta",
      description: "Italian fine dining"
    }
  ]
})
*/
