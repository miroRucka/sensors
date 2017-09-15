var logger = require('./config/logging');
var sensors = require('./sensors/sensors');
var uploader = require('./upload/sensorUploader');
var scheduler = require('./scheduler/serviceScheduler');
var stompService = require('./messaging/stompService')();
var photoSubscriber = require('./messaging/photoSubscriber');

logger.info('start application for reading sensor data...');
logger.info('garden-pi');

/*var stompMessageClient;
var photoSubscriberInstance;
stompService.connect(function (sessionId, client) {
    stompMessageClient = client;
    photoSubscriberInstance = photoSubscriber(client);
    photoSubscriberInstance.subscribe();
});

var jobTick = function () {
    if (photoSubscriberInstance) {
        photoSubscriberInstance.resubscribe();
    }
    sensors().then(function (data) {
        return uploader(data)
    }).then(function (data) {
        logger.info('result after upload is ', data);
    });
};

scheduler(jobTick).start();*/


process.on('uncaughtException', function (err) {
    logger.error('Caught exception: ', err);
});

