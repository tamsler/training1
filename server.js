
var restify = require('restify');
var mongo = require('./lib/mongo');
var api = require('./lib/api');
var middleware = require('./lib/middleware');
var www = require('./lib/www');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.jsonBodyParser({ mapParams: false }));
//server.use(restify.gzipResponse());


/*
 * APIs
 */

/*
 * REST GET : Get users
 */
server.get('/api/v1/users', middleware.validateAuthN, api.getUsersV1);

/*
 * REST GET : Serving WWW Files
 * NOTE: Must be last server.get(...) declaration
 *
 * e.g. http://localhost:8080/docs/public/index.html
 */

server.get('/.*', www.serveV1);

/*
 * REST POST : Create user
 */
server.post('/api/v1/users', api.postUserV1);

/*
 * REST POST : Login user
 */
server.post('/api/v1/users/login', api.postUserLoginV1);

/*
 * REST PUT : Update user
 */
server.put('/api/v1/users', api.putUserV1);


/*
 * REST DELETE : Delete user by userId or MondoDb objectId (_id)
 *
 * @request query parameter userId
 * @request query parameter objectId
 *
 */
server.del('/api/v1/users', api.deleteUserV1);


/*
 * Start MongoDB and Node.js server
 */
mongo.init(function() {

    console.log("INFO: MongoDB is ready");

    server.listen(8080, function() {

        console.log('%s listening at %s', server.name, server.url);
    });
});

