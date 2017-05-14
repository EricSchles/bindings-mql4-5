var colors = require('colors'),
    _ = require('underscore'),
    Deferred = require("promised-io/promise").Deferred,
    config = require('./../config'),
    utils = require('./../utils'),
    zmq = require('zeromq'),
    server = config.exchanges.fxpro.pricing_server,
    port_prefix = config.exchanges.fxpro.port_prefix,
    enabled = config.exchanges.fxpro.enabled,
    debug = config.exchanges.fxpro.debug,
    exchangeRef = config.exchanges.fxpro.name;

module.exports = {

    exchangeName: config.exchanges.fxpro.name,

    markers: config.exchanges.fxpro.symbols,

    emitter: {},

    hasOpenOrder: false,

    symbolZMQ: {},

    initialize: function(emitter) {
        this.emitter = emitter;
        this.setMarket();
    },

    setMarket: function() {
        if (enabled) {
            this.bindEvents();
            this.subscribeExchange();
        }
    },

    bindEvents: function() {
        _.bindAll(this, 'checkOrderStatus', 'fetchBalance', 'createOrder');
        this.emitter.on(this.exchangeName + ':orderNotMatched', this.checkOrderStatus);
        this.emitter.on(this.exchangeName + ':orderMatched', this.fetchBalance);
        this.emitter.on(this.exchangeName + ':orderCreated', this.checkOrderStatus);
        this.emitter.on(this.exchangeName + ':orderNotCreated', this.createOrder);
    },

    subscribeExchange: function() {

        _.each(this.markers, function(symbols) {

            if (utils.getSymbolExchangePort(symbols) > 0) {

                this.symbolZMQ[symbols] = zmq.socket('sub');
                this.symbolZMQ[symbols].connect('tcp://' + server + ':' + port_prefix + utils.getSymbolExchangePort(symbols) + '');
                this.symbolZMQ[symbols].subscribe('');
                this.listeningExchange(symbols);

            }
        }, this);

    },

    listeningExchange: function(symbols) {


        this.symbolZMQ[symbols].on('message', function(data) {

            var msg = (data.toString('utf8'));
            var msg_obj = JSON.parse(msg)

            if (typeof msg_obj === 'object') {

                if (debug) {
                    console.log('Message ' + msg);
                }

                utils.emitMarketData(msg_obj, exchangeRef);

            }

        })
    },

    fetchBalance: function() {

    },

    createOrder: function(market, type, rate, amount) {

    },

    calculateProfit: function(amount, decimals) {

    },

    calculateCost: function(amount, decimals) {

    },

    getExchangeInfo: function() {

    },

    checkOrderStatus: _.debounce(function() {

    }),

    populatePrices: function(data) {

    }
};
