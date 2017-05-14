const kafka 	= require('kafka-node');
var producer 	= kafka.Producer,
    client 		= new kafka.Client('localhost:2181'),
    producer 	= new Producer(client);

module.exports = {
    producer: producer,
    client: client
};
