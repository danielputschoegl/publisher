/**
 * This file cleans the data from noise. The data must be stable a certain time (eg 1sec) and must lie in the range to compensate inaccuracies.
 */

var eventHandler = require('../modules/event-handler');

var stable = 0; // last stable value
var last = null; // last passed value
var timer = null;

var time = process.env.TIME; // in ms
var range = parseInt(process.env.RANGE); // in *type* +- from last stable value !!! Pay attention to the measuring range of the scales. !!!
var type = process.env.RANGE_TYPE;

eventHandler.subscribe('serial', function (totalWeight) {

    if (last == null) {
        last = totalWeight;
    }

    if (!timer) {
        setTimer(totalWeight);
    }

    if (last !== totalWeight) {
        clearTimeout(timer);
        timer = null;
    }

    last = totalWeight;
});

function setTimer(totalWeight) {
    timer = setTimeout(function () {
        var lower = 0;
        var upper = 0;

        switch (type) {
            case 'g':
                lower = stable - range;
                upper = stable + range;

                break;
            case '%':
                lower = stable - stable * (range / 100);
                upper = stable + stable * (range / 100);

                break;
            default:
                lower = stable - range;
                upper = stable + range;

                break;
        }

        if (totalWeight <= lower || upper <= totalWeight) {
            var data = {
                'totalWeight': totalWeight,
                'weightChange': totalWeight - stable
            };

            stable = totalWeight;
            eventHandler.publish('stable', data);
        }
    }, time);
}