var cam = require('../camera/camera');
var logger = require('../config/logging');
var photoUploader = require('../upload/photoUploader');

module.exports = function (stompClient) {

    var destination = '/topic/take-photo';

    var _subscribe = function () {
        logger.info('subscribe to ', destination);
        stompClient.subscribe(destination, function (body, headers) {
            logger.info("get message ", body);
            logger.info("get parsed message ", JSON.parse(body));
            var message = body ? JSON.parse(body).pointId : 'empty';
            logger.info('>> taking picture...', message, body, headers);
            cam().takePicture().then(function () {
                logger.info('<< taking picture');
                photoUploader();
                logger.info('<< upload photo done!');
            });
        });
    };

    var _unsubscribe = function () {
        stompClient.unsubscribe(destination);
    };

    var _resubscribe = function () {
        _unsubscribe();
        _subscribe();
    };

    return {
        subscribe: _subscribe,
        unsubscribe: _unsubscribe,
        resubscribe: _resubscribe
    }
};