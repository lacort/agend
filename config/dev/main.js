module.exports = {

    //REDIS CONFIG - DB3 - WEBSOCKET
    'redis_3': {
        'host': 'redis',
        'port': 6379,
        'db': 3,
        'password': 'redis1234'

    },

    // MONGO DB QUEUES CONFIG
    'db_agend': {
        'strConnection': 'mongodb://agend:1234@mongo-agend:27017/nextAgend',
        'options': {
            'keepAlive': true,
            'keepAliveInitialDelay': 300000,
            'useNewUrlParser': true,
            'useUnifiedTopology': true,
            'ssl': false,
            'sslValidate': false,
            'sslCA': '',
            'sslCert': '',
            'sslKey': ''
        }
    },

};