import React, { useEffect } from 'react';
import Messages from './Messages';
import axios from 'axios';
import { sendMessageRoute } from '../utils/APIRoutes';

export default function Chat({username, socket}) {
    return (
        <div>
            <Messages username={username}/>
            <h1>Chat</h1>
            <div className='input-container'>
                <input type="text" name="txt" id="txt" placeholder='type your message here'/>
                <ChatInput username={username} socket={socket} />
            </div>
        </div>
    )
}

function ChatInput({ username, socket }) {
    useEffect(() => {
        if (socket.current) {
            socket.current.on('receive-message', (data) => {
                console.log(data);
            });
        }
    })
    const handleSubmit = async () => {
        const message2 = document.getElementById('txt').value;
        console.log(message2);
        if (message2) {
            //console.log(username._id);
            //console.log(username);
            console.log(username.username);
            const { data } = await axios.post(sendMessageRoute, {
                message: message2,
                from: username._id,
                username: username.username
            });
            socket.current.emit('message', {
                message: message2,
                from: username._id,
                username: username.username
            });
            if (data.status === true) {
                console.log('Message sent');
            } else {
                console.log('Message not sent');
            }
            //console.log(data);
        }
        document.getElementById('txt').value = '';
    }
    return (
        <button onClick={handleSubmit}>Send</button>
    )
}