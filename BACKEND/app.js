var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()


var indexRouter = require('./routes/index');
var adminRouter = require('./modules/admin/admin.router');
var catagoryRouter = require('./modules/catagory/catagory.router')
var subcatagoryRouter = require('./modules/subCatagory/subcatagory.router')
var questionsRouter = require('./modules/questions/questions.router')

var app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('DB CONNECTED !'))
  .catch((err) => console.log(err.message))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter)
app.use('/catagory', catagoryRouter)
app.use('/subcatagory', subcatagoryRouter)
app.use('/questions', questionsRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
