/**
 * collects all data from sensor
 * @type {exports}
 */
//var sensorLib = require('node-dht-sensor');
var Promise = require("promise");
var logger = require('../config/logging');
var config = require('../config/sensors.json');


var _readDH11 = function () {
    return new Promise(function (resolve, reject) {
        var init = sensorLib.initialize(11, 4);
        if (init) {
            var readout = sensorLib.read();
            resolve({
                temperature: readout.temperature.toFixed(2),
                humidity: readout.humidity.toFixed(2),
                location: config.location,
                locationId: config.locationId,
            })
        } else {
            logger.error('error occurred - read sensor data, please check configuration and hw settings,');
            reject();
        }
    });
};


module.exports = _readDH11;