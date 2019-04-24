var eventHandler = require('../modules/event-handler');
var axios = require('axios');

eventHandler.subscribe('stable', function (data) {
    var url = 'http://localhost:3000/weight';
    var weight = {
        'weight': data
    };

    axios.post(url, weight)
        .then(function (res) {
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error.message);
        });
});