import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/contacts';
import Chat from '../components/Chat';
import {io} from 'socket.io-client';
import { host } from '../utils/APIRoutes';

const ChatPage = () => {
    const socket = useRef();
    const navigate = useNavigate();
    let [username, setUsername] = useState(undefined);
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
   useEffect(() => {
        async function check_existance_client() {
        //console.log(localStorage.getItem('users'));
        var user = await JSON.parse(localStorage.getItem('users'));
        console.log(user);
        if (!localStorage.getItem('users')) {
            console.log("errer11");
            navigate('/login');
        } else {
            setUsername(await JSON.parse(localStorage.getItem('users')));
            console.log(username);
        }
    }
check_existance_client();
}, []);
    useEffect(() => {
        if (username) {
            socket.current = io(host);
            socket.current.emit('addUser', username._id);
        }
    
    })
    //console.log("the returned thing is: ", username);
  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    <div className="uh">
        <div className="container">
            <Contacts username={username}/>
        </div>
    </div>
    <div className="chat">
        <Chat username={username} socket={socket}/>
    </div>
    </>
  );
};

export default ChatPage;
