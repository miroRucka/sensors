var config = require('../config/sensors.json');
module.exports = {
    'Authorization': config.auth,
    'Accept': 'application/json'
};