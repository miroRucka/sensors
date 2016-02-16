/**
 * post sensor data to server
 * @type {exports}
 */
var restler = require('restler');
var config = require('../config/sensors.json')
var logger = require('../config/logging');
var headers = require('./headers');
var Promise = require("promise");

module.exports = function (sensorData) {

    var _getEndpoint = function () {
        var endpoint = process.argv[2];
        return endpoint || config.serverEndpoint;
    };

    return new Promise(function (resolve, reject) {
        restler.postJson(_getEndpoint() + "api/sensors", sensorData, {
            headers: headers
        }).on("success", function (data) {
            resolve(data);
        }).on("fail", function (err) {
            reject(err);
            logger.error("exception sensor uploading", err);
        }).on("error", function (err) {
            reject(err);
            logger.error("exception sensor uploading", err);
        });
    });
};