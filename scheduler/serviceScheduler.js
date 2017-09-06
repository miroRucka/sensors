/**
 * schedule system activity and download settings from server
 * @type {exports}
 */
var logger = require('../config/logging');
var config = require('../config/sensors.json');
var utils = require('../utils');

module.exports = function (job) {

    var timeout;

    var startJob = function () {
            timeout = setTimeout(function () {
                logger.debug('job fired...');
                if (utils.exists(job)) {
                    job();
                } else {
                    logger.debug('job is not exist, please check configuration');
                }
                startJob();
            }, config.jobTimeout);
    };

    var stopJob = function () {
        if (utils.exists(timeout)) {
            clearTimeout(timeout);
        }
    };

    return {
        start: startJob,
        stop: stopJob
    }
}
;

