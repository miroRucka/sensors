var cam = require('../camera/camera');
var logger = require('../config/logging');

module.exports = function (stompClient) {

    var destination = '/topic/take-photo';

    var _subscribe = function () {
        logger.info('subscribe to ', destination);
        stompClient.subscribe(destination, function (body, headers) {
            var message = body ? body.pointId : 'empty';
            logger.info('>> taking picture...', message, body, JSON.parse(body).pointId);
            cam().takePicture().then(function () {
                logger.info('<< taking picture');
            });
        });
    };

    var _unsubscribe = function () {
        stompClient.unsubscribe(destination);
    };

    return {
        subscribe: _subscribe,
        unsubscribe: _unsubscribe
    }
};