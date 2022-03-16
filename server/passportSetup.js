const passport = require('passport');
const LocalStrategy = require("passport-local")
const JwtStrategy = require("passport-jwt/lib/strategy");
const { models: { User } } = require('./db');
const createError = require('http-errors');
const debug = require('debug');
const log = debug('app:passport:');

// configure passport authentication middleware
// The local strategy verifies the user by using the correctPassword function
// on our model
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Find the user in the database
    const user = await User.findOne({ where: { username } })
    // If there's no user, return user not found Error
    if (!user) {
      return done(createError(404, "User not found"))
    }
    log(`Found user ${user.id}`);
    // Check if the user's password is correct
    if (!(await user.correctPassword(password))) {
      // If it's not, send an Incorrect username/password error
      return done(createError(401, "Incorrect username/password"))
    }
    // If all checks pass, call done with null for error, and user for the req.user
    // Passport will attach the second argument to req.user automatically
    return done(null, user)
  })
)

// This is used to extract the JWT token from the signed cookie.
const cookieExtractor = function (req) {
  log('Extracting Cookie from Request', req.signedCookies);
  var token = null
  if (req && req.signedCookies) {
    token = req.signedCookies["token"]
  }
  return token
}

// This sets up JWT authentication as a strategy we can use as middleware
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT,
      jwtFromRequest: cookieExtractor, // We've customized the default behavior 
                                       // to get the JWT from a cookie
    },
    async (jwt_payload, done) => {
      log.extend('jwt')(jwt_payload);
      const { username } = jwt_payload
      // Look for the user in the database based on the info stored in the JWT
      const user = await User.findOne({ where: { username } })
      // If there's no user, throw a User not found error;
      if (!user) {
        return done(createError(404, "User not found"))
      }
      log(`Found user ${user.id}`);
      // If we got here, call done with null for error and user for the req.user
      // Passport will attach the second argument to req.user automatically
      return done(null, user)
    }
  )
)

