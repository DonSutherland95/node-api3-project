const express = require('express');
const server = express();
const usersRouter = require('./users/userRouter')

server.use(express.json());
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
