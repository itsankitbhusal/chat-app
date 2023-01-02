import React, { useState, useEffect } from 'react'
import io from "socket.io-client"
import { Chat } from './Chat';

const socket = io.connect("http://localhost:8000");

const App = () => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        // console.log("joinRoom function")
        // console.log("username: ", username);
        // console.log("room: ", room)

        if (username && room) {
            // console.log("socket id: ", socket.id)
            // console.log("join room: ", room)
            socket.emit("join_room", room);
        }

    }


    return (
        <>
            <div style={{
                display: "grid",
                placeItems: "center"
            }} >
                <div />
                <h3>Join a chat</h3>
                <input type="text" placeholder='Ankit...' onChange={(r) => {
                    setUsername(r.target.value);
                }} />
                <br />
                <input type="text" placeholder='Room id' onChange={(r) => {
                    setRoom(r.target.value);
                }} />
                <br />
                <button onClick={joinRoom}>Join A Room</button>
                <Chat socket={socket} username={username} room={room} />
            </div>
            <div />
        </>
    )
}

export default App