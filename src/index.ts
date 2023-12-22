import * as http from  'node:http';
import MockData from "./utils/mockData";

const port = 3030;

const server = http.createServer((req:any, res:any) => {
    res.statusCode = 200;
    res.setHeader('Content_Type', 'application/json', );
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.write('Hello from the server');
    res.write(JSON.stringify(MockData));
    res.end();
})

server.listen(port,  (): void => {
    try{
        console.log('Server has now started and is listening on port: ' + port )
    } catch(error) {
        console.log('Something went wrong', error);
    }
})