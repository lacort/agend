const Agenda = require('agenda');
const logger = require('./logger');
const {
    MongoClient
} = require('mongodb');
const objConfig = require('../../config/dev/main');
const fs = require('fs');
const sleep = require('system-sleep');

class AgendaTeste {
    constructor() {
        this.agenda;
    }

    async start() {
        const client = await MongoClient.connect(objConfig.db_agend.strConnection, objConfig.db_agend.options);
        this.agenda = await new Agenda({
            maxConcurrency: 2000,
            processEvery: "10 seconds",
            defaultLockLifetime: 0
        }).mongo(client.db("nextAgend2"), "jobs");
        this.agenda.cancel({name:'nextAgenda'})
        this.agenda.define('nextAgenda', async job => {
            let dateNow = new Date(Date.now())
            let data = `Agend2 Agendado: ${job.attrs.lastRunAt}, id: ${job.attrs.data.id}  \n`
            //console.log(data)
            logger.error(data)

        });
        

        await new Promise(resolve => this.agenda.once('ready', resolve));
        this.agenda.start()
    }
    async schedule(intTime, strName, objData) {

        this.agenda.schedule(new Date(Date.now() + intTime), strName, objData)


    }

    async update(strName, intTime, intRepeat) {
        let job = await this.agenda.jobs({
            name: strName
        }, {
            data: -1
        })

        job[0].attrs.repeatInterval = intRepeat
        job[0].attrs.lockedAt = null
        job[0].attrs.nextRunAt = new Date(Date.now() + intTime);

        await job[0].save()
        //console.log(job[0].attrs)

    }
    async multJobs(date){
        console.log('agenda2')
        let dateFix = new Date('2021-03-18T23:55:03.904Z');
        let b;
        for (b = 0; b < 50; b++) {
            
            this.agenda.schedule(dateFix, 'nextAgenda', {
                id: b + 1
            })
            console.log('for1  ' + b)
        }
        let i;
        for (i = 50; i < 200; i++) {
            let time = i * 500;
            this.agenda.schedule(new Date(Date.now() + time), 'nextAgenda', {
                id: i + 1
            })
            console.log('for2  ' + i)
        }
        
       

    }

}


module.exports = new AgendaTeste();