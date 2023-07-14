import React, {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <h1>User</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default App;