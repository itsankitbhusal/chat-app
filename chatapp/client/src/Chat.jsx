import React, { useEffect, useState } from "react";

export const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = async () => {
    console.log(currentMessage);
    if (currentMessage && room && username) {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //   console.log("message", messageData);
      await socket.emit("send_message", messageData);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received: ", data);
    });
  }, [socket]);

  return (
    <>
      <div>
        <p>Live Chat</p>
      </div>
      <div>
        {/* body */}
        <div></div>
        {/* footer */}
        <div>
          <input
            type="text"
            onClick={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
};
