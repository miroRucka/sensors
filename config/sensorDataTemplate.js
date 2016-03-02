/**
 * template data for uploading to horske.info (point info is data to monitoring suslik point)
 * @type {exports.config|*}
 */
var config = require('./sensors.json');
module.exports.get = function () {
    return {
        temperature: [],
        pressure: 0,
        light: 0,
        humidity:0,
        location: config.location,
        locationId: config.locationId
    }
};