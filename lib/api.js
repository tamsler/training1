
var mongo = require('./mongo');

//var users = [];
//users.push({'userId':'jb', 'firstName' : 'Jim', 'lastName' : 'Brewer'});
//users.push({'userId':'rb', 'firstName' : 'Rich', 'lastName' : 'Brewer'});
//users.push({'userId':'tpa', 'firstName' : 'Thomas', 'lastName' : 'Amsler'});

function getUsersV1(req, res, next) {

    mongo.find("users", {}, {}, function(err, users) {

            if(err) {

                res.send(500, "ERROR: getUsersV1 : find");
                return next();
            }
            else if(users) {

                res.json(200, users);
                return next();
            }
            else {

                res.send(500, "ERROR: getUsersV1 : find : no users");
                return next();
            }
        }
    );
}

function postUserV1(req, res, next) {

    var newUser = req.body;

    mongo.insert("users", newUser, function(err, result) {

            if(err) {

                res.send(500, "ERROR: postUserV1 : insert : newUser");
                return next();
            }
            else if(result) {

                res.send(201);
                return next();
            }
        }
    );
}

function putUserV1(req, res, next) {

    var updateUser = req.body;

    mongo.update("users", {'userId': updateUser.userId}, updateUser, function(err, numUpdatedDocs) {

        if(err) {

            res.send(500, "ERROR: putUserV1 : update");
            return next();
        }
        else if(1 === numUpdatedDocs) {

            res.send(200);
            return next();
        }
        else {

            res.send(400, "ERROR: Was not able to update user with userId : " + updateUser.userId);
            return next();
        }
    });
}


function deleteUserV1(req, res, next) {

    var queryStrings = req.getQuery();
    var userId = queryStrings.userId;
    var objectId = queryStrings.objectId;

    var queryDoc = {};

    if(userId) {

        queryDoc["userId"] = userId;
    }
    else if(objectId) {

        queryDoc["_id"] = mongo.objectID(objectId);
    }
    else {

        res.send(400, "ERROR: deleteUserV1 : Missing userId or objectId query string");
        return next();
    }

    mongo.remove("users", queryDoc, function(err, numRemovedDocs) {

        if(err) {

            res.send(500, "ERROR: deleteUserV1 : remove");
            return next();
        }
        else if(1 === numRemovedDocs) {

            res.send(200);
            return next();

        }
        else {

            res.send(400, "ERROR: Was not able to delete user with userId : " + userId);
            return next();
        }
    });
}

exports.getUsersV1 = getUsersV1;
exports.postUserV1 = postUserV1;
exports.putUserV1 = putUserV1;
exports.deleteUserV1 = deleteUserV1;
