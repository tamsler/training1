var fs = require('fs');
var url = require('url');
var mime = require('mime');

function serveV1(request, response, next) {

    var filePath = "";
    var urlPath = url.parse(request.url).pathname;

    if (urlPath === '/' || urlPath === '/index.html') {

        filePath = '/index.html';
    }
    else {

        filePath = urlPath;
    }

    var contentType = mime.lookup(filePath);
    var file = './app' + filePath;

    fs.exists(file, function(exists) {

        if (exists && contentType) {

            fs.readFile(file, function(error, content) {

                if (error) {

                    response.writeHead(500);
                    response.end();
                }
                else {

                    response.writeHead(200,
                        {
                            'Content-Type': contentType,
                            'Cache-Control': 'no-transform,public,max-age=300,s-maxage=900'
                        }
                    );
                    response.end(content, 'utf-8');
                }
            });
        }
        else {

            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end("HTTP Status Code: 404<br/><br/>These aren't the droids you're looking for", 'utf-8');
        }
    });
}

exports.serveV1 = serveV1;