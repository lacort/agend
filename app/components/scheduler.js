const Agenda = require('agenda');
const {
    MongoClient
} = require('mongodb');
const objConfig = require('../../config/dev/main');

class AgendaTeste {
    constructor() {
        this.agenda;
    }

    async start() {
        const client = await MongoClient.connect(objConfig.db_agend.strConnection, objConfig.db_agend.options);
        this.agenda = await new Agenda({
            maxConcurrency: 20000,
            processEvery: "10 seconds"
        }).mongo(client.db("nextAgend"), "jobs");

        this.agenda.define('nextAgenda', async job => {
            console.log('hello, World!', job.attrs.data.message);
            

        });

        await new Promise(resolve => this.agenda.once('ready', resolve));
        this.agenda.start()
    }
    async schedule(intTime, strName, objData) {

        this.agenda.schedule(new Date(Date.now() + intTime), strName, objData)
        //this.agenda.start();

    }

    async update(strName, intTime,intRepeat) {
        let job = await this.agenda.jobs({
            name: strName
        }, {
            data: -1
        })
        
        job[0].attrs.repeatInterval = intRepeat
        job[0].attrs.lockedAt = null
        job[0].attrs.nextRunAt = new Date(Date.now() + intTime);
        
        await job[0].save()
        console.log(job[0].attrs)
    }

}


module.exports = new AgendaTeste();