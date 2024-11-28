'use strict'
require('dotenv').config()
const mongoose = require('mongoose');



const connectString = process.env.MONGODB_URI || 'mongodb://localhost:27017/db';

class Database {

    constructor(){
        this.connect();
    }

    connect(type = 'mongodb'){
        mongoose.connect(connectString).then( _ => console.log(`Mongodb Success Port::${connectString} !!!`))
            .catch( err => console.log(err));
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;