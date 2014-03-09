
var mongo = require('./mongo');

function validateAuthN(req, res, next) {

    var authorization = req.authorization;

   if(authorization && authorization.scheme && authorization.scheme === 'Session' && authorization.credentials ) {

        mongo.findOne(
            "users",
            { 'authToken' : authorization.credentials },
            { 'fields' : { 'authToken' : 1 }},
            function(err, user) {

                if(err) {

                    res.send(500, "ERROR: validateAuthN : err : " + err.message);
                    console.log("ERROR: validateAuthN : err : ", err);
                    return;
                }
                else if(user && "" !== user.authToken) {

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