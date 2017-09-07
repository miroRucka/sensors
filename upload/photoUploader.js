/**
 * http client file uploader put photo to server
 * @type {exports}
 */
var fs = require('fs');
var restler = require('restler');
var config = require('../config/sensors');
var logger = require('../config/logging');
var headers = require('./headers');
var Promise = require("promise");
var endpoint = require('./uploadEndpoint');

module.exports = function () {
    var imagePath = config.imagePath + config.imageName;
    return new Promise(function (resolve, reject) {
        fs.stat(imagePath, function (err, stats) {
            if (err) {
                reject(err);
            } else {
                var uri = endpoint.getEndpoint() + "api/sensors/photo/" + config.locationId;
                logger.info('start uploading from path', imagePath, 'to uri: ', uri);
                restler.put(uri, {
                    multipart: true,
                    headers: headers,
                    data: {
                        "file": restler.file(imagePath, null, stats.size, null, "image/jpg")
                    }
                }).on("success", function (data) {
                    resolve(data);
                    logger.info('uploading succes!');
                }).on("fail", function (err) {
                    reject(err);
                    logger.error("exception photo uploading", err);
                }).on("error", function (err) {
                    reject(err);
                    logger.error("exception photo uploading", err);
                });
            }
        });
    });
};
