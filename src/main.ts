import { Server } from "./server/server";


const server = new Server();

setInterval(() => {
    server.update();
}, 1);