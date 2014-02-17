var mongodb = require('mongodb');

var db;

/*
 * Connecting to MongoDB
 *
 * Connect string format is:
 *
 * mongodb://<host>/<collection name>?
 */
function init(callback) {

    mongodb.MongoClient.connect("mongodb://localhost/training1?",
        {
            db: {
                native_parser: false,
                w: 1,
                journal: true
            },
            server: {
                auto_reconnect: true
            },
            replSet: {},
            mongos: {}
        },
        function(err, newDb) {

            if(err) {

                console.log("ERROR: db.open : err = " + err.message);
            }
            else {

                db = newDb;
                callback();
            }
        }
    );
}

function insert(collectionName, doc, callback) {

    db.collection(collectionName, function(err, collection) {

        collection.insert(doc, { safe : true }, function(err, result) {

            if(err) {

                callback(err, null);
            }
            else if(result && result.length === 1) {

                callback(null, result[0]);
            }
            else {

                callback(null, result);
            }
        });
    });
}

function find(collectionName, queryDoc, options, callback) {

    db.collection(collectionName, function(err, collection) {

        collection.find(queryDoc, options).toArray(callback);
    });
}

exports.init = init;
exports.insert = insert;
exports.find = find;