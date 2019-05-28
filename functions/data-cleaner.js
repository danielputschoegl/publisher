var eventHandler = require('../modules/event-handler');

var stable = 0; // letzter stable Wert
var last = null; // letzter übergebener Wert
var timer = null;

var time = process.env.TIME; // in ms
var range = process.env.RANGE; // in *type* +- vom letzten stable Wert !!! auf Messbereich der Waage achten !!!
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