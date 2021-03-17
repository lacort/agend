const Agenda = require('agenda');
const {
    MongoClient
} = require('mongodb');
const objConfig = require('../../config/dev/main');



async function run() {

    const client = await MongoClient.connect(objConfig.db_agend.strConnection, objConfig.db_agend.options);
    const agenda = new Agenda({
        maxConcurrency: 5000,
        processEvery: "30 seconds"
    }).mongo(client.db("nextAgend"), "jobs");
    agenda.define('hello', job => {
        console.log('hello, World!',job.attrs.data.message);
        // process.exit(0);

    });
    
    await new Promise(resolve => agenda.once('ready', resolve));
    //agenda.cancel({ name: "hello" })
    let i;
    for(i=0;i<10000;i++){
        agenda.schedule(new Date(Date.now() + 30000), 'hello',{
            message: i
        });
        
    }
    agenda.start();
    
}
run().catch(error => {
    console.error(error);
    process.exit(-1);
});