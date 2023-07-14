import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                throw err;
            });
    }, []);

    const handleCreate = () => {
        navigate('/users/add');
    }

    return (
        <div>
            <h1>User</h1>
            {users.map(user => (
                <div key={user.id}>
                    <a href={`/users/${user.id}`}>
                        {user.name}
                    </a>
                </div>
            ))}
            <button type='button' onClick={handleCreate}>
                Create
            </button>
        </div>
    )
}

export default Users;