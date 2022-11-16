const path = require('path');
const express = require('express');

const app = express();

const nationRouter = require('./routes/nationRouter');
const matchRouter = require('./routes/matchRouter');
const viewRouter = require('./routes/viewRouter')

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));



// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests, try again later"
// });

// app.use('/api', limiter);

// Body parser, read req.body
app.use(express.json({ limit: '10kb' }));

// Testing middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies)
  next();
});

// Routes
app.use('/api/v1/nations', nationRouter);
app.use('/api/v1/matches', matchRouter);
app.use('/', viewRouter);

module.exports = app;
