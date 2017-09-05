var Camera = require("camerapi");
var config = require('../config/configLoader').config;
var logger = require('../config/logging');
var Promise = require("promise");

module.exports = function () {

    var width = config.cameraResolutionWidth;

    var _computeHeight = function () {
        return ((width * 3) / 4);
    };

    var options = {
        timeout: 150,
        width: width,
        height: _computeHeight(),
        ISO: 100,
        exposure: 'auto',
        awb: 'sun',
        metering: 'average'
    };

    var cam = new Camera().prepare(options);
    cam.baseFolder(config.imagePath);

    var _takePicture = function () {
        return new Promise(function (resolve, reject) {
            cam.takePicture(config.imageName, function (file, error) {
                if (error) {
                    reject(error);
                    logger.error("take picture error", error);
                } else {
                    resolve(file);
                }
            })
        });
    };

    return {
        takePicture: _takePicture
    }
};
