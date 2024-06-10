import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
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
        const {data} = await axios.post(registerRoute, {username, password});
        if (data.status === false) {
            console.log(data.error);
        } if (data.status === true) {
            localStorage.setItem('users', JSON.stringify(data.newUser));
            navigate('/chat');
        }
    };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Register</button>
        <span>already have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
};

export default Register;
