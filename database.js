let mongoose = require('mongoose');

const MONGODB_CONNECT_URL = 'mongodb+srv://kittin:vatavata@kittin-cluster.4qoug.mongodb.net/kittinDB?retryWrites=true&w=majority';

class Database {
    constructor() {
        this._connect();
        console.log('database connected');
    }

    _connect() {
        mongoose.connect(MONGODB_CONNECT_URL, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
            });
    }
}

module.exports = new Database();
