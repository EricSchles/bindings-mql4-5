module.exports = {
    exchanges : {
        'xm' : {
            name: 'xm',
            enabled: true,
            fee : 0.2 / 100, //
            currencies : ['USD'],
            pricing_server: '76.9.21.100',
            execution_server: '76.9.21.100',
            port_prefix: 20,
            debug: true,
            symbols: ['EURUSD', 'USDJPY', 'GBPUSD', 'USDCHF', 'EURGBP', 'EURJPY', 'EURCHF', 'AUDUSD', 'USDCAD', 'NZDUSD']
        },
        'fxpro' : {
            name: 'fxpro',
            enabled: true,
            fee : 0.2 / 100, //
            currencies : ['USD'],
            pricing_server: '76.9.21.101',
            execution_server: '76.9.21.101',
            port_prefix: 40,
            debug: true,
            symbols: ['EURUSD', 'USDJPY', 'GBPUSD', 'USDCHF', 'EURGBP', 'EURJPY', 'EURCHF', 'AUDUSD', 'USDCAD', 'NZDUSD']
        }
    }
};

