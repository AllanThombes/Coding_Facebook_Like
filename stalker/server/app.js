var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

global.appRoot = path.resolve(path.join(__dirname, ".."));

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var config = require("./config/config.js");
var User = require("./models/user.js");

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/views", express.static(path.join(appRoot, "client", "views")));
app.use(express.static(path.join(appRoot, "client", "public")));


app.use(expressSession({
    secret: 'superSecretTttro;pbien687Tableafourrure',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).end(JSON.stringify({message: "Not Found"}));
});

// error handlers
app.use(function(err, req, res) {
    res.status(err.status || 500);

    res.end(JSON.stringify({
	message: err.message
    }));
});

module.exports = app;
