var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('./node_modules/ricecenter/core/auth')
var loggerFactory = require('./node_modules/ricecenter/core/logger')
var uuid = require('node-uuid');

var routes = require('./routes/index');
var users = require('./routes/users');
var rice = require('./routes/rice');
var loginsign = require('./routes/loginsign');
var activity = require('./routes/activity');
var common = require('./routes/common');
var task = require('./routes/task');

var accessLogger = loggerFactory.getAccessLogger();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(function (req, res, next) {
    var traceId = uuid.v1();
    accessLogger.info(traceId + "|" + req.originalUrl + "|" + req.body);
    res.on('finish', function () {
        accessLogger.info(traceId + "|" + res.statusCode + "|" + res.statusMessage);
    });
    res.setHeader("Content-Encoding", "UTF-8");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') !== 'development') {
    app.use(auth());
}

app.use('/', routes);
app.use('/user', users);
app.use('/rice', rice);
app.use('/loginsign', loginsign);
app.use('/recordgame',loginsign);
app.use('/activity',activity);
app.use('/common',common);
app.use('/task',task);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to busi
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
