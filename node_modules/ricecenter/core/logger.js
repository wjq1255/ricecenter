/**
 * Created by Administrator on 2015/5/25.
 */
var logger = require('log4js');
var path = require('path');

logger.configure(__dirname + path.sep + 'log4js.json', {reloadSecs:300});

exports.getLogger = function(category) {
    return logger.getLogger(category);
}

exports.getDebugLogger = function() {
    return logger.getLogger("debug");
}

exports.getAccessLogger = function() {
    return logger.getLogger("access");
}

exports.getOperateLogger = function() {
    return logger.getLogger("operate");
}