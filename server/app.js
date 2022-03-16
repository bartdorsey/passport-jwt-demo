const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/apiRouter.js");
const path = require('path');
const debug = require('debug');

// We need to do this to setup passport before we use it.
require("./passportSetup.js")

// This will log anything in here with the app: prefix.
// To filter logs for this, add DEBUG=app:* to your .env file
const log = debug("app:");

const app = express()

app.use(morgan("dev"))

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json())

app.use("/api", apiRouter)

// If we are in production, serve up the React built app
if (process.env.NODE_ENV === 'production') {
  log("In production, serving up React app...");
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

// error handling end-ware
app.use(async (err, req, res, next) => {
  log(err);
  res.status(err.status || 500).send({
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });
});

module.exports = app
