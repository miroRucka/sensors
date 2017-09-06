var cam = require('../camera/camera');

module.exports = function (stompClient) {

    var destination = '/queue/take-photo';

    var _subscribe = function () {
        stompClient.subscribe(destination, function(body, headers) {
            logger.info('>> taking picture...');
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