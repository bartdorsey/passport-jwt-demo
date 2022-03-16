const passport = require('passport');
const requireToken = passport.authenticate('jwt', { session: false });

module.exports = {
  requireToken
}