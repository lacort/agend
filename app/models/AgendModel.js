'use strict'

const  mongooseAgend = require('../components/mongodbAgend');
const Schema = mongooseAgend.Schema;
const ObjectId = Schema.ObjectId;
const mongo = require('mongodb');


var QueuesSchema = new Schema({
    _id:{
        type: ObjectId
    },
    queue_id:{
        type: ObjectId
    },
    ewt: Number,
    ewt_last_update: Date,
});



var AgendSchema = new Schema({
    _id: {
        type: ObjectId
    },
    queues : [QueuesSchema],
   
},{
    versionKey: false
});


var Model = mongooseAgend.model('Agend', AgendSchema, 'agend');

module.exports = Model;
