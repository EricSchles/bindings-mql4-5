var zmq = require('zeromq'),
    queueconf = require('./queueconf'),
    responder = zmq.socket('pub'),
    kafka = require('kafka-node'),
    Producer = kafka.Producer,
    PubNub = require('pubnub');

if (queueconf.zeromq.enabled)
    pubnub = new PubNub({
        publishKey: queueconf.zeromq.publishKey,
        subscribeKey: queueconf.zeromq.subscribeKey
    })

var client, producer;

module.exports = {

    initialize: function() {

        if (queueconf.zeromq.enabled) {
            responder.bind('tcp://' + queueconf.zeromq.host + ':' + queueconf.zeromq.port, function(err) {
                console.log("Listening")
            })
        }

        if (queueconf.kafka.enabled)
            this.kafkaConnect()

    },

    kafkaConnect: function() {
        this.client = new kafka.Client(queueconf.kafka.zookeeper_host + ":" + queueconf.kafka.zookeeper_port)
        this.producer = new Producer(this.client)
    },

    publishToQueue: function(channel, data) {

        // PUBNUB PUBLISH
        if (queueconf.zeromq.pubnub) {
            var publishConfig = {
                channel: channel,
                message: data
            }

            pubnub.publish(publishConfig, function(status, response) {
                console.log(status, response);
            })
        }

        // ZMQ PUBLISH
        if (queueconf.zeromq.enabled)
            responder.send([channel, data])

        // KAFKA PUBLISH
        if (queueconf.kafka.enabled) {

            if (typeof data === 'object') {
                var payloads = [{
                    topic: channel,
                    messages: JSON.stringify(data),
                    //  messages: data,
                    partition: 0
                }];

                this.producer.send(payloads, function(err) {
                    if (err) {
                        console.log('Error: ' + err);
                    }
                });
            }

        }
    }

};