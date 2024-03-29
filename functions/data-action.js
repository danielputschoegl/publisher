var eventHandler = require('../modules/event-handler');
var axios = require('axios');

// POST the data to the webserver
eventHandler.subscribe('stable', function (data) {
    var url = 'http://192.168.43.196:3000/admin/lorry/weight';

    data.lorryId = process.env.LORRY_ID;

    console.log(data);

    axios.post(url, data)
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.error(error.message);
        });
});