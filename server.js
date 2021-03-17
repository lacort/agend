require('dotenv').config();
const sleep = require('system-sleep')
const agendMongo = require('./app/components/mongodbAgend');
// const agendModel = require('./app/models/AgendModel');
const teste = require('./app/components/scheduler');
const logger = require('./app/components/logger');



teste.start()
sleep(5000)

//teste.schedule(60000,'nextAgenda',{message:'Gloria'})

teste.update('nextAgenda',10000,'')

logger.info('testando agendamento')


