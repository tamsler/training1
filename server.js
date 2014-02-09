
var restify = require('restify');
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
 * REST POST : Create user
 */
server.post('/api/v1/users', api.postUserV1);


server.listen(8080, function() {

    console.log('%s listening at %s', server.name, server.url);
});