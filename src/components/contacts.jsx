import React, { useEffect, useState } from 'react';
import { getAllUsersRoute } from '../utils/APIRoutes';
import axios from 'axios';

function Contacts({username}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the database
        const fetchUsers = async () => {
            try {
                const response = await axios.get(getAllUsersRoute);
                console.log(response.data);
                const data = response.data.users;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => {
                    return (
                    <li key={user.id}>{user.username}</li>
                )})}
            </ul>
        </div>
    );
}

export default Contacts;