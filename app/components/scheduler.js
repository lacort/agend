const Agenda = require('agenda');
const {
    MongoClient
} = require('mongodb');
const objConfig = require('../../config/dev/main');



async function run() {
    
    const client = await MongoClient.connect(objConfig.db_agend.strConnection, objConfig.db_agend.options);
    const agenda = new Agenda().mongo(client.db("nextAgend"), "jobs");
    agenda.define('hello', () => {
        console.log('hello, World!');
        process.exit(0);

    });
   


    await new Promise(resolve => agenda.once('ready', resolve));

    agenda.schedule(new Date(Date.now() + 2000), 'hello');
    agenda.start();
}
run().catch(error => {
    console.error(error);
    process.exit(-1);
});