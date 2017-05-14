var colors = require('colors'),
    config = require('./config'),
    _ = require('underscore'),
    when = require('promised-io/promise').when,
    all = require('promised-io/promise').all,
    utils = require('./utils'),
    Deferred = require("promised-io/promise").Deferred,
    queueconf = require('./queueconf'),
    queue = require('./queue'),
    events = require('events'),
    emitter = new events.EventEmitter();

module.exports = {

    priceLookupCounter: 0,

    openTrades: [],

    exchangeMarkets: {
        'xp': require('./exchanges/xm'),
        'fxpro': require('./exchanges/fxpro')
    },

    initialize: function() {

        this.bindEvents()
        this.initializeExchanges()
        this.populateValidExchanges()

        utils.initialize(emitter)
        queue.initialize()

    },

    bindEvents: function() {
        _.bindAll(this, 'sendMessage')
        emitter.on('sendMessage', this.sendMessage)
    },

    sendMessage: function(message) {

        queue.publishToQueue("forex", message)
    },

    populateValidExchanges: function() {

        var exchanges_enabled = _.filter(config.exchanges, function(item) {
            return item.enabled == true
        })

        this.validExchanges = {};
        if (exchanges_enabled.length > 0) {
            this.validExchanges = exchanges_enabled
        }
    },

    initializeExchanges: function() {
        _.each(this.exchangeMarkets, function(exchange) {
            exchange.initialize(emitter)
        }, this);
    }

};
