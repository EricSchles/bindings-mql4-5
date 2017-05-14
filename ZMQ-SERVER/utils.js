var config      = require('./config'),
    _           = require('underscore')


module.exports = {

    emitter: {},

    initialize: function (emitter) {
        this.emitter = emitter;
    },

    emitMarketData: function(data,exchange) {
        this.emitter.emit('sendMessage',data)
    },

    getSymbolExchangePort: function(symbol) {

        var selected = 0;

        switch (symbol) {
            case 'AUDCAD':
                selected = '02';
                break;
            case 'AUDCHF':
                selected = '03';
                break;
            case 'EURUSD':
                selected = '04';
                break;
            case 'AUDJPY':
                selected = '05';
                break;
            case 'AUDNZD':
                selected = '06';
                break;
            case 'CADCHF':
                selected = '07';
                break;
            case 'CADJPY':
                selected = '08';
                break;
            case 'CHFJPY':
                selected = '09';
                break;
            case 'EURAUD':
                selected = '10';
                break;
            case 'EURCAD':
                selected = '11';
                break;
            case 'EURCHF':
                selected = '12';
                break;
            case 'EURGBP':
                selected = '13';
                break;
            case 'GBPAUD':
                selected = '14';
                break;
            case 'GBPCAD':
                selected = '15';
                break;
            case 'GBPCHF':
                selected = '16';
                break;
            case 'GBPJPY':
                selected = '17';
                break;
            case 'GBPNZD':
                selected = '18';
                break;
            case 'NZDCHF':
                selected = '19';
                break;
            case 'NZDJPY':
                selected = '20';
                break;
            case 'NZDUSD':
                selected = '21';
                break;
            case 'EURNZD':
                selected = '22';
                break;
            case 'USDCAD':
                selected = '23';
                break;
            case 'EURJPY':
                selected = '24';
                break;
            case 'AUDUSD':
                selected = '25';
                break;
            case 'GBPUSD':
                selected = '26';
                break;
            case 'USDCHF':
                selected = '27';
                break;
            case 'USDJPY':
                selected = '28';
                break;
        }

        return selected;
    }

};