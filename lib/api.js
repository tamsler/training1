

var users = [];

function getUsersV1(req, res, next) {

    //users.push({'userId':'tpa', 'firstName' : 'Thomas', 'lastName' : 'Amsler'});

    res.json(200, users);

    return next();

}

function postUserV1(req, res, next) {

    var user = req.body;
    console.log("DEBUG: POST User : %j", user);
    users.push(user);

    res.send(200);
    return next();
}

exports.getUsersV1 = getUsersV1;
exports.postUserV1 = postUserV1;