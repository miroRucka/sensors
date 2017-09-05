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

//scheduler(jobTick).start();


var stompService = require('./messaging/stompService')();

var stompMessageClient;
stompService.connect(function (sessionId, client) {
    stompMessageClient = client;
    client.subscribe('/queue/take-photo', function(body, headers) {
        console.log('This is the body of a message on the subscribed queue:', body);
    });
});

/**
 * test connect activemq via stomp...
 *
 */
setTimeout(function () {
    stompMessageClient.publish('/queue/take-photo', 'from raspberry :)');
}, 3000);


var cam = require('./camera/camera');

logger.info('>> taking picture...');

cam().takePicture().then(function () {
    logger.info('done!');
});

logger.info('<< taking picture');


process.on('SIGINT', function () {
    logger.info('Application sensors shutting down!');
    stompMessageClient.disconnect();
});
process.on('uncaughtException', function (err) {
    logger.error('Caught exception: ', err);
});

