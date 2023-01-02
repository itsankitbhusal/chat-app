const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");

// socket io
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    // for resolving cors issue
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {

    console.log("user connected:", socket.id);

    // while join room
    socket.on("join_room", (data) => {
        console.log(`Received join_room event with data: ${data}`);
        socket.join(`User with id: ${socket.id} joins room: ${data}`);
        console.log(`Successfully joined room: ${data}`);
    });
    // while sending message
    socket.on("send_message", (data) => {
        console.log("received data: ", data)
        // emit the message to all users in a room(which will be provided from frontend)
        socket.emit("receive_message", data);
    });
    socket.on("disconnected", () => {
        console.log("user disconnected", socket.id)
    })
});




server.listen(8000, () => {
    console.log(`Server running: http://localhost:8000`)
});