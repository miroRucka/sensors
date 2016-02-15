/**
 * settings for logger framework, set path tu debug log and exception log
 * @type {exports}
 */
var winston = require('winston');
var config = require('./sensors.json');
var logger = new (winston.Logger)({

    transports: [
        //new (winston.transports.Console)({ json: false, timestamp: true, level: 'debug' }),
        new winston.transports.File({ filename: config.logPath + 'debug.log', json: false, level: 'debug' })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true}),
        new winston.transports.File({ json: false, filename: config.logPath + 'exceptions.log' })
    ],
    exitOnError: false
});
module.exports = logger;