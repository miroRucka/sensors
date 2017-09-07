var cam = require('../camera/camera');

module.exports = function (stompClient) {

    var destination = '/topic/take-photo';

    var _subscribe = function () {
        stompClient.subscribe(destination, function (body, headers) {
            var message = body ? body.pointId : 'empty';
            logger.info('>> taking picture...', message);
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