/**
 * collects all data from sensor
 * @type {exports}
 */
var sensorLib = require('node-dht-sensor');
var Promise = require("promise");
var logger = require('../config/logging');
var config = require('../config/sensors.json');
var init = sensorLib.initialize(config.sensorType, config.pin);
logger.info('init sensors hw is ', init);


var _readDH11 = function () {
    return new Promise(function (resolve, reject) {
        if (init) {
            var readout = sensorLib.read();
            var data = {
                temperature: readout.temperature.toFixed(2),
                humidity: readout.humidity.toFixed(2),
                location: config.location,
                locationId: config.locationId,
            };
            logger.info('data ', data);
            resolve(data);
        } else {
            logger.error('error occurred - read sensor data, please check configuration and hw settings,');
            reject();
        }
    });
};


module.exports = _readDH11;