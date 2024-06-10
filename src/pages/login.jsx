import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('username: ', username);
    console.log('password: ', password);
    // Perform registration logic here
    if (!username || !password) {
        return console.log('Username or password cannot be empty');
    }
        const {data} = await axios.post(loginRoute, {username, password});
        if (data.status === false) {
            console.log(data.error);
        } if (data.status === true) {
            console.log('Login successful');
            localStorage.setItem('users', JSON.stringify(data.userNameCheck));
            navigate('/chat');
        }
    };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} id="name" onChange={handleUsernameChange} />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input type="password" value={password} id="pwd" onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>
        <span>already have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  );
};

export default Login;
