const logger = require('./app/components/logger');
const agenda = require('./app/components/scheduler');
const agenda2 = require('./app/components/shceduler2');
const agendMongo = require('./app/components/mongodbAgend');
const objConfig = require('./config/dev/main.js');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const redisAdapter = require('socket.io-redis');

http.listen(objConfig.websocket_agend.port);
agenda.start()
agenda2.start()
// io.adapter(redisAdapter({
//     host: objConfig.redis_3.host,
//     port: objConfig.redis_3.port,
//     auth_pass: objConfig.redis_3.password
// }));

// Set Origin requisition
io.origins((origin, callback) => {
    console.log(origin)
    if (origin !== objConfig.allowed_origin) {
        isAllowedOrigin = false;
    } else
        isAllowedOrigin = true;

    return callback(null, true);

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {

    socket.on('msg', (msg => {
        if(msg.action == 'Agenda'){
            //agenda.schedule(Number(msg.time), msg.name, msg.data)
            agenda2.schedule(Number(msg.time), msg.name, msg.data)
           
        }else if(msg.action == 'Update'){
            //agenda.update(msg.name, Number(msg.time), msg.data)
            agenda2.update(msg.name, Number(msg.time), msg.data)
        }
        else{
            console.log(msg)
            agenda2.multJobs(msg.time)
            agenda.multJobs(msg.time)
            
        }
        // console.log(msg)
    }))
})


logger.info({
    message: 'NEXT Websocket Frontend Version ' + process.env.APP_VERSION + ' in ' + process.env.APP_ENV + ' Used port ' + objConfig.websocket_agend.port
});