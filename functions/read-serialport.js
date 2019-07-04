var eventHandler = require('../modules/event-handler');
var ReadSerialport = require('serialport');
var Readline = require('@serialport/parser-readline');
var port = new ReadSerialport('/dev/ttyUSB0');

// Only on complete data objects the parser is triggered. It is triggered several times per second.
var parser = port.pipe(new Readline({delimiter: '\r\n'}));
parser.on('data', function (data) {
    var buffer = new Buffer(data);
    var string = buffer.toString();
    var numeric = string.match(/\d+/g);

    if (numeric) {
        var numbers = numeric.map(Number);
        var number = numbers[0];

        if (string.includes('-')) {
            number = number * -1;
        }

        eventHandler.publish('serial', number);
    }
});