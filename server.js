require("dotenv").config();

const Knex = require("knex");
const knexConfig = require("./knexfile");
const { Model } = require("objection");
const express = require("express");
const session = require("express-session");
const passport = require('passport');
const configurePassport = require('./passport-config');
const history = require("connect-history-api-fallback");
const path = require("path");
const flash = require('express-flash');

const games = require("./routes/game-routes");
const users = require("./routes/user-routes");

// Objection and Knex
const knex = Knex(knexConfig.development);
Model.knex(knex);

// Express
const app = express();
const port = process.env.PORT || 5000;

// JSON
app.use(express.json());
app.set("json spaces", 2);

app.use(flash());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "some salt",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.COOKIE_SECURE === "true" || false,
    maxAge: Number(process.env.SESSION_TIMEOUT) || 1800000 // 30 minutes
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Routes
app.use("/api/v1/games", games);
app.use("/api/v1/users", users);

// Vue history fallback
app.use(history());

// Path setup
app.use(express.static("client/dist"));
app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client/dist", "index.html")));

// Listener
app.listen(port, () => console.log(`Listening on port ${port}`));