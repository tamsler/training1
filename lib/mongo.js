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

    db.collection(collectionName).insert(doc, { safe : true }, function(err, result) {

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
}
function findOne(collectionName, queryDoc, options, callback) {

    db.collection(collectionName, function(err, collection) {

        collection.findOne(queryDoc, options, function(err, doc) {

            if(err) {

                callback(err, null);
            }
            else if(doc) {

                callback(null, doc);
            }
            else {

                callback(null, null);
            }
        });
    });
}


function find(collectionName, queryDoc, options, callback) {

    db.collection(collectionName).find(queryDoc, options).toArray(callback);
}

function remove(collectionName, queryDoc, callback) {

    db.collection(collectionName).remove(queryDoc, callback);
}

function update(collectionName, queryDoc, updateDoc, callback) {

    db.collection(collectionName).update(queryDoc, updateDoc, { upsert : false, safe : true}, callback);
}

function objectID(hexId) {

    if(hexId) {

        return new mongodb.ObjectID.createFromHexString(hexId);
    }
    else {

        return new mongodb.ObjectID();
    }
}

exports.init = init;
exports.insert = insert;
exports.find = find;
exports.findOne = findOne;
exports.update = update;
exports.remove = remove;
exports.objectID = objectID;