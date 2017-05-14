const kafka = require('kafka-node');
const Consumer = kafka.Consumer;

module.exports = {
    create: function create(client, topic) {
        return new Consumer(client, [{topic: topic, partition: 0}], {autocommit: false});
    }
};
