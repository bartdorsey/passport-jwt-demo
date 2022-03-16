const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./authRouter.js');
const userRouter = require('./userRouter.js');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;

