var axios = require('axios');

setInterval(setTime, 1000);

function setTime() {
    var url = 'http://localhost:3000/time';
    var data = {
        time: (new Date()).toTimeString()
    };

    axios.post(url, data)
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.error(error)
        });
}
