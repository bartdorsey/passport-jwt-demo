"use strict"
const debug = require('debug');
const log = debug('db:seed:');

const {
  db,
  models: { User },
} = require("../server/db")

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  log("db synced!")

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ])

  log(`seeded ${users.length} users`)
  log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  log("seeding...")
  try {
    await seed()
  } catch (err) {
    log(err)
    process.exitCode = 1
  } finally {
    log("closing db connection")
    await db.close()
    log("db connection closed")
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
