"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("node:http");
var mockData_1 = require("./utils/mockData");
var port = 3030;
var server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content_Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.write('Hello from the server');
    res.write(JSON.stringify(mockData_1.default));
    res.end();
});
server.listen(port, function () {
    try {
        console.log('Server has now started and is listening on port: ' + port);
    }
    catch (error) {
        console.log('Something went wrong', error);
    }
});
