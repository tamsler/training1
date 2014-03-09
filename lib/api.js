
var mongo = require('./mongo');
var uuid = require('node-uuid');

function getUsersV1(req, res, next) {

    mongo.find("users", {}, { 'fields' : { 'firstName' : 1, 'lastName' : 1 } }, function(err, users) {

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

    console.log("DEBUG: postUserV1: newUser: ", newUser);

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

    console.log("DEBUG: updateUser : ", updateUser);

    updateUser._id = mongo.objectID(updateUser._id);

    mongo.update(
        "users",
        {'_id': updateUser._id},
        { $set : { 'firstName' : updateUser.firstName , 'lastName' : updateUser.lastName } },
        function(err, numUpdatedDocs) {

        if(err) {

            console.log("ERROR: putUserV1 : err :", err);
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

function postUserLoginV1(req, res, next) {

    var loginUser = req.body;

    /*
     * Compare user login info
     */
    mongo.findOne(
        "users",
        { 'loginId': loginUser.loginId, 'password' : loginUser.password },
        { 'fields' : {'loginId' : 1, 'firstName' : 1, 'lastName' : 1, 'authToken' : 1}},
        function(err, user) {

            if(err) {

                res.send(500, "ERROR: postUserLoginV1 : find : err : " + err.message);
                console.log("ERROR: postUserLoginV1 : find : err : ", err);
                return next();
            }
            else if(user) {

                /*
                 * Create auth token
                 */
                user.authToken = uuid.v1();

                /*
                 * Update user document with new authToken
                 */
                mongo.update("users", {'_id': user._id}, { $set : { 'authToken' : user.authToken }}, function(err, numUpdatedDocs) {

                    if(err) {

                        res.send(500, "ERROR: postUserLoginV1 : update : err : " + err.message);
                        console.log("ERROR: postUserLoginV1 : update : err :", err);
                        return next();
                    }
                    else if(1 === numUpdatedDocs) {

                        res.send(200, user);
                        return next();
                    }
                    else {

                        res.send(400, "ERROR: postUserLoginV1 : update : Was not able to update user with session info");
                        console.log("ERROR: postUserLoginV1 : update : Was not able to update user with session info");
                        return next();
                    }
                });
            }
            else {

                res.send(403, "ERROR: postUserLoginV1 : User authentication error");
                console.log("ERROR: postUserLoginV1 : User authentication error");
                return next();
            }
        }
    );
}

exports.getUsersV1 = getUsersV1;
exports.postUserV1 = postUserV1;
exports.putUserV1 = putUserV1;
exports.deleteUserV1 = deleteUserV1;
exports.postUserLoginV1 = postUserLoginV1;
