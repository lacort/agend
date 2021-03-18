const Agenda = require('agenda');
const logger = require('./logger');
const {
    MongoClient
} = require('mongodb');
const objConfig = require('../../config/dev/main');
const fs = require('fs');

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
        }).mongo(client.db("nextAgend"), "jobs");

        this.agenda.define('nextAgenda', async job => {
            let dateNow = new Date(Date.now())
            let data = `Data Agora: ${dateNow}, Agendado: ${job.attrs.lastRunAt}, id: ${job.attrs.data.id} \n`
            console.log(data)
            // logger.error(data)
            


        });
        // let date = new Date('2021-03-18T14:33:03.904Z');
        // this.agenda.cancel({name:'nextAgenda'})
        // let i;
        // for (i = 0; i < 2000; i++) {
        //     this.agenda.schedule(date, 'nextAgenda', {
        //         id: i + 1
        //     })
        // }

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

}


module.exports = new AgendaTeste();