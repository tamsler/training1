

var users = [];
users.push({'userId':'jb', 'firstName' : 'Jim', 'lastName' : 'Brewer'});
users.push({'userId':'rb', 'firstName' : 'Rich', 'lastName' : 'Brewer'});
users.push({'userId':'tpa', 'firstName' : 'Thomas', 'lastName' : 'Amsler'});

function getUsersV1(req, res, next) {

    res.json(200, users);

    return next();
}

function postUserV1(req, res, next) {

    var user = req.body;
    users.push(user);

    res.send(200);
    return next();
}

exports.getUsersV1 = getUsersV1;
exports.postUserV1 = postUserV1;