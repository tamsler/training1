
var mongo = require('./mongo');


function validateAuthZ(req, res, next) {

    var userRole = req['trainingUserRole'];
    console.log("DEBUG: validateAuthZ : userRole : ", userRole);

    if("user" === userRole || "admin" === userRole) {

        return next();
    }
    else {

        res.send(403, "ERROR: validateAuthZ : invalid role");
        console.log("ERROR: validateAuthZ : invalid role : ", userRole);
        return;
    }
}


function validateAuthN(req, res, next) {

    var authorization = req.authorization;

    if(authorization && authorization.scheme && authorization.scheme === 'Session' && authorization.credentials ) {

        mongo.findOne(
            "users",
            { 'authToken' : authorization.credentials },
            { 'fields' : { 'authToken' : 1, 'userRole' : 1}},
            function(err, user) {

                if(err) {

                    res.send(500, "ERROR: validateAuthN : err : " + err.message);
                    console.log("ERROR: validateAuthN : err : ", err);
                    return;
                }
                else if(user && "" !== user.authToken) {

                    req['trainingUserRole'] = user.userRole;
                    return next();
                }
                else {

                    res.send(403, "ERROR: validateAuthN : invalid AuthToken");
                    console.log("ERROR: validateAuthN : invalid AuthToken");
                    return;
                }
            }
        );
    }
    else {

        res.send(400, "ERROR: validateAuthN : Invalid authorization headers");
        console.log("ERROR: validateAuthN : Invalid authorization headers");
        return;
    }
}

exports.validateAuthN = validateAuthN;
exports.validateAuthZ = validateAuthZ;