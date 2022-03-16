require('dotenv').config();
const debug = require('debug');
const { db } = require("./db")
const PORT = process.env.PORT || 4000
const app = require("./app")
const seed = require("../script/seed")

const log = debug("app:server");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed()
    } else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => log(`Listening on port ${PORT}`))
  } catch (ex) {
    console.error(ex)
  }
}

init()
