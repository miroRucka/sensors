var logger = require('./config/logging');
var sensors = require('./sensors/sensors');
var uploader = require('./upload/sensorUploader');
var scheduler = require('./scheduler/serviceScheduler');

logger.info('start application for reading sensor data...');

var jobTick = function () {
    sensors().then(function (data) {
        return uploader(data)
    }).then(function (data) {
        logger.info('result after upload is ', data);
    });
};

scheduler.start(jobTick);