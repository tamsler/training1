
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

exports.getUsersV1 = getUsersV1;
exports.postUserV1 = postUserV1;