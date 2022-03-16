const Sequelize = require("sequelize")
const pkg = require("../../package.json")
const debug = require("debug")
const prettyLogger = require('sequelize-pretty-logger');

const log = debug("db:query:")

const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "")

const config = {
  logging: prettyLogger({
    logger: log
  })
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  }
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
)
module.exports = db
