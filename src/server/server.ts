
import * as express from "express";
import * as http from "http";
import * as path from "path";

export class Server {

    constructor() {
        const app = express.default();
        const server = new http.Server(app);

        // Send everything in the client directory of the dist folder
        app.use(express.static(path.join(__dirname + '/../client')));
        app.get('/', (request, response) => {
            response.sendFile(path.join(__dirname + '/../client/index.html'));
        });

        server.listen('5000', () => {
            console.log("Listening on *:5000");
        });
    }

    public update(): void {

    }
}