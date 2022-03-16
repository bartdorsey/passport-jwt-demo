const express = require("express")
const userRouter = express.Router()
const { requireToken } = require('../middleware.js');
const { models: { User } } = require('../db');
const createError = require('http-errors');

const debug = require('debug');
const log = debug('api:users:');

// GET /api/users
userRouter.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    });
    res.json(users);
  } catch (error) {
    log(error);
    next(createError(500, "Couldn't get list of users, try again later."));
  }
});

module.exports = userRouter
