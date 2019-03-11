const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient

export default (errLog, req, res, next) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'edu';
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection('error_logs')
            .insertOne({
                name: errLog.name,
                message: errLog.message,
                stack: errLog.stack,
                time: new Date()
            }, (err, result) => {
                if (err) {
                    throw err
                }
                res.json({
                    err_code: 500,
                    message: errLog.message
                })
            })


        client.close();
    })
}