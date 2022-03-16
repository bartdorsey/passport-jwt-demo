const express = require("express")
const passport = require("passport")
const authRouter = express.Router()
const createError = require("http-errors")
const debug = require("debug");
const { requireToken } = require("../middleware.js");

const COOKIE_OPTIONS = {
  sameSite: 'strict',
  httpOnly: true,
  signed: true
}

const log = debug("api:auth");

// POST /api/auth
authRouter.post(
  "/",
  passport.authenticate("local", {
    // We need session: false here to not need express-session setup
    // Since we are using JWT
    session: false
  }),
  async (req, res, next) => {
    /**
      @instance {import('../db/index.js').User} user
     */
    const user = req.user
    // Generate a JWT and store in a cookie.
    try {
      const token = user.generateToken()
      log(`Generated Token for User id ${user.id}`)
      res.cookie("token", token, COOKIE_OPTIONS)
      res.send(user.safeUser())
    } catch (error) {
      log(error)
      next(createError(401, "Unable to authenticate."))
    }
  }
)

// GET /api/auth
authRouter.get('/', requireToken, (req, res, next) => {
  res.send(req.user.safeUser());
});

// DELETE /api/auth
authRouter.delete('/', requireToken, (req, res, next) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.send();
})

module.exports = authRouter
