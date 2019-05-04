var eventHandler = (function(){
    var topics = {};
    var properties = topics.hasOwnProperty;

    return {
        subscribe: function(topic, listener) {
            if(!properties.call(topics, topic)) {
                topics[topic] = [];
            }

            var index = topics[topic].push(listener) - 1;

            return {
                remove: function() {
                    delete topics[topic][index];
                }
            };
        },
        publish: function(topic, info) {
            if(!properties.call(topics, topic)) {
                return;
            }

            topics[topic].forEach(function(item) {
                item(info !== undefined ? info : {});
            });
        }
    };
})();

module.exports = eventHandler;