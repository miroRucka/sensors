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

var rpiDhtSensor = require('rpi-dht-sensor');

var dht = new rpiDhtSensor.DHT11(2);

function read() {
    var readout = dht.read();

    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' + readout.humidity.toFixed(2) + '%');
}
read();


process.on('uncaughtException', function (err) {
    logger.error('Caught exception: ', err);
});

