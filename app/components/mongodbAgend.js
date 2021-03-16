'use strict'

const logger = require('./logger');
const objConfig = require('../../config/dev/main');
const mongoose = require('mongoose').Mongoose;


const mongooseAgend = new mongoose();
// disable findAnd Modify warning
mongooseAgend.set('useFindAndModify', false);

// Mongo DB Connection
mongooseAgend.connect(objConfig.db_agend.strConnection, objConfig.db_agend.options);

// Set up a var to test connection
let mongodb = mongooseAgend.connection;

    // Bind Connection Events
    mongodb.on('error', function(err){
        logger.error({message: '### ERROR connecting with MongoDB Agenda: ' + err});
    });
    
    mongodb.on('reconnected', function(err){
        logger.info({message: '### RECONNECTED to MongoDB Agenda'});
    });

    mongodb.on('disconnected', function(err){
        logger.error({message: '### DISCONNECTED to MongoDB Agenda'});
    });

    mongodb.on('reconnectFailed', function(err){
        logger.error({message: '### RECONNECTED to MongoDB Agenda FAILED!'});
    });

    // Log the connection confirmation
    mongodb.on('open', function() {
        logger.info({message: '### MongoDB Queues Database connected successfully on '});
    });

module.exports = mongooseAgend;


