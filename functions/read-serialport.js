var eventHandler = require('../modules/event-handler');
var ReadSerialport = require('serialport');
var Readline = require('@serialport/parser-readline');
var port = new ReadSerialport('/dev/ttyUSB0');

var parser = port.pipe(new Readline({delimiter: '\r\n'}));
parser.on('data', function (data) {
    var buffer = new Buffer(data);
    var string = buffer.toString();
    var numeric = string.match(/\d+/g);

    if (numeric) {
        var numbers = numeric.map(Number);

        eventHandler.publish('serial', numbers[0]);
    }
});