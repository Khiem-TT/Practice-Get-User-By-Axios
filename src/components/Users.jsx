import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = axios.get('http://localhost:3001/api/users');
        const getArticles = axios.get('http://localhost:3001/api/articles');
        setLoading(true);
        setTimeout(() => {
            axios
                .all([getUsers, getArticles])
                .then(
                    axios.spread((res1, res2) => {
                        const usersData = res1.data.map(user => {
                            return {
                                ...user,
                                article: res2.data.filter(item => {
                                    return item.user_id === user.id;
                                })
                            }
                        })
                        setUsers(usersData);
                    })
                )
                .catch(err => {
                    throw err;
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 3000);
    }, []);

    const handleCreate = () => {
        navigate('/users/add');
    }
    if (loading) return <p>Loading...</p>
    return (
        <>
            <h1>User</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Article numbers</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>
                            <a href={`/users/${user.id}`}>
                                {user.name}
                            </a>
                        </td>
                        <td>{user.article.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type='button' onClick={handleCreate}>
                Create
            </button>
        </>
    )
}

export default Users;