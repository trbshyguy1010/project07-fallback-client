import React, { useEffect, useState } from "react";
import axios from "axios";
import { getMessagesRoute } from "../utils/APIRoutes";
import "../styles/messages.css";

export default function Messages({username}) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        //console.log(username);
        async function fetchMessages() {
            // Fetch messages from the server
            const response = await axios.post(getMessagesRoute, {});
            //console.log(response.data);
            setMessages(response.data);
        }
        fetchMessages();
    });
    // socket
    return (
        <div>
            <h1>Messages</h1>
            <div className="chat-messages">
                {messages.map((message) => {
                    const msgTime = new Date(message.time);
                    return (
                        <div key={message._id}>
                            <h3><i>{message.username}</i> -- {msgTime.getHours()}:{(msgTime.getMinutes() < 10 ? '0' : '') + msgTime.getMinutes()} on {msgTime.getDate()}/{msgTime.getMonth() + 1}/{msgTime.getFullYear()}</h3>
                            <p>{message.message}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}