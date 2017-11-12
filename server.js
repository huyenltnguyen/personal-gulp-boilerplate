// Reference for the 'cannot find static' error:
// https://stackoverflow.com/questions/24346161/nodejs-connect-cannot-find-static

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();

app.use(serveStatic(__dirname + '/build'));

http.createServer(app).listen(3000, function() {
	console.log('Server is live on port 3000');
});