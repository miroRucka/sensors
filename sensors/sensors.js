/**
 * collects all data from sensor
 * @type {exports}
 */
var Promise = require("promise");
var logger = require('../config/logging');
var config = require('../config/sensors.json');
var dataTemplate = require('../config/sensorDataTemplate');
var dht = require('node-dht-sensor');
var sense = require('ds18b20');
var BMP085 = require('bmp085');
var barometer = new BMP085();
var BH1750 = require('bh1750');
var _ = require('lodash');
var utils = require('../utils');

/**
 * init
 */
var light = new BH1750();
var init = dht.initialize(config.sensorType, config.pin);


var _readDHT = function () {
    return new Promise(function (resolve, reject) {
        if (init) {
            var readout = dht.read();
            var data = {
                temperature: readout.temperature,
                humidity: readout.humidity
            };
            resolve(data);
        } else {
            logger.error('error occurred - read sensor data, please check configuration and hw settings,');
            reject();
        }
    });
};

var _readBmp085 = function () {
    return new Promise(function (resolve, reject) {
        barometer.read(function (data) {
            resolve(data);
        });
    });
};

var _readLight = function () {
    return new Promise(function (resolve, reject) {
        light.readLight(function (value) {
            resolve(value);
        });

    });
};

var _readDs18b20 = function () {
    return new Promise(function (resolve, reject) {
        sense.sensors(function (err, ids) {
            if (err) {
                reject(err);
                logger.error('exception reading sensor Ds18b20', err);
            } else {
                _readDs18b20WithId(ids, resolve, reject)
            }
        });
    });
};

var _readDs18b20WithId = function (ids, resolve, reject) {
    console.log("ids>>", ids);
    if (!utils.exists(ids)) {
        reject("no id for Ds18b20 sensor");
        logger.error('no id for Ds18b20 sensor');
        return;
    }
    _.each(utils.exists(ids) && !_.isArray(ids) ? [ids] : ids, function (id) {
        console.log("id>>", id);
        sense.temperature(id, function (err, value) {
            if (err) {
                reject(err);
                logger.error('exception reading sensor Ds18b20', err);
            } else {
                console.log("id>>", value);
                resolve(value);
            }
        });
    });
};

var _getPressureRSL = function (pressure, temperature, elevation) {
    if (_.isUndefined(pressure) || _.isUndefined(temperature) || _.isUndefined(elevation)) {
        return;
    }
    return Number(pressure) / Math.exp(-Number(elevation) / (29.271795 * (273.15 + Number(temperature))));
};

module.exports = function () {
    var result = dataTemplate.get();
    return _readBmp085()
        .then(function (data) {
            var rsl = _getPressureRSL(data.pressure, data.temperature, config.elevation);
            result.pressure = utils.exists(rsl) ? rsl : data.pressure;
            result.temperature.push({'key': 't1', value: Number(data.temperature)});
            return _readDs18b20();
        }, function () {
            return _readDs18b20();
        }).then(function (data) {
            result.temperature.push({'key': 't2', value: Number(data)});
            return _readLight();
        }, function () {
            return _readLight();
        }).then(function (light) {
            result.light = light;
            return _readDHT()
        }).then(function (dht) {
            result.temperature.push({'key': 't3', value: Number(dht.temperature)});
            result.humidity = dht.humidity;
            return new Promise(function (resolve) {
                resolve(result);
            });
        }, function () {
            return new Promise(function (resolve) {
                resolve(result);
            });
        });
};