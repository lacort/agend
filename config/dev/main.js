module.exports = {
    // WEBSOCKET 
    'allowed_origin': 'http://127.0.0.1:8887',

    //REDIS CONFIG - DB3 - WEBSOCKET
    'redis_3': {
        'host': 'redis',
        'port': 6379,
        'db': 3,
        'password': 'redis1234'

    },

    // MONGO DB QUEUES CONFIG
    'db_agend': {
        'strConnection':'mongodb://localhost:27017' ,// 'mongodb://agend:1234@mongo-agend:27017/nextAgend',
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
     //WORKERKEY
     'websocket_agend':{
        'port': 8081,
        'headers': {
            "X-NextQS-WS-AcessKey": "y25!e5@s19#h8u21%a1m13*a1s19h8i9+a1"
          } 
        }

};