import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
})

io.on('connection', (socket) => {
    console.log("A user is connected: " + socket.id);

    socket.on("chat message", (msg) => {
        console.log(msg)
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected!!")
    });

});

server.listen(8000, () => {
    console.log('Listening on port 8000');
});

