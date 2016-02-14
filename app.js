var sensorLib = require("node-dht-sensor");

var sensor = {
    sensors: [ {
        name: "Indoor",
        type: 11,
        pin: 25
    }, {
        name: "Outdoor",
        type: 11,
        pin: 4
    } ],
    read: function() {
        for (var a in this.sensors) {
            var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);
            console.log(this.sensors[a].name + ": " +
                b.temperature.toFixed(1) + "C, " +
                b.humidity.toFixed(1) + "%");
        }
        setTimeout(function() {
            sensor.read();
        }, 2000);
    }
};

sensor.read();