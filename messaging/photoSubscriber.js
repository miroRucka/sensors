var cam = require('../camera/camera');
var logger = require('../config/logging');
var photoUploader = require('../upload/photoUploader');

module.exports = function (stompClient) {

    var destination = '/topic/take-photo';

    var _subscribe = function () {
        logger.info('subscribe to ', destination);
        stompClient.subscribe(destination, function (body, headers) {
            var message = body ? JSON.parse(body).pointId : 'empty';
            logger.info('>> taking picture...', message, body, headers);
            cam().takePicture().then(function () {
                logger.info('<< taking picture');
                photoUploader();
                logger.info('<< upload photo done!');
            });
        });
    };

    var _unsubscribe = function (cb) {
        cb = cb || function () {
            };
        stompClient.unsubscribe(destination, cb);
    };

    var _resubscribe = function () {
        _unsubscribe(function () {
            logger.info("success unsubscribe!");
            _subscribe();
        });
    };

    return {
        subscribe: _subscribe,
        unsubscribe: _unsubscribe,
        resubscribe: _resubscribe
    }
};