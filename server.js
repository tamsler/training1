
var restify = require('restify');
var mongo = require('./lib/mongo');
var api = require('./lib/api');


var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.jsonBodyParser({ mapParams: false }));
server.use(restify.gzipResponse());


/*
 * APIs
 */

/*
 * REST GET : Get users
 */
server.get('/api/v1/users', api.getUsersV1);

/*
 * REST GET : Serving WWW Files
 *
 * e.g. http://localhost:8080/docs/public/index.html
 */
server.get(/\/docs\/public\/?.*/, restify.serveStatic({
    directory: './app'
}));

/*
 * REST POST : Create user
 */
server.post('/api/v1/users', api.postUserV1);

/*
 * REST PUT : Update user
 */
server.put('/api/v1/users', api.putUserV1);

/*
 * REST DELETE : Delete user
 */
server.del('/api/v1/users/:userId', api.deleteUserV1);

/*
 * Start MongoDB and Node.js server
 */
mongo.init(function() {

    console.log("INFO: MongoDB is ready");

    server.listen(8080, function() {

        console.log('%s listening at %s', server.name, server.url);
    });
});

