var config = require('../config/sensors.json');

module.exports = {
    getEndpoint: function () {
        var endpoint = process.argv[2];
        return endpoint || config.serverEndpoint;
    }
}