var http = require('http');
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'index.html');
var stat = fs.statSync(filePath);

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        ws.send(message);
    });
});

http.createServer(function (req, res) {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': stat.size
        });
        var rs = fs.createReadStream(filePath);
        rs.pipe(res);
        return;
    }
    req.pipe(res);
}).listen(80);