import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'

function UserDetails() {
    const {userId} = useParams();
    const isCreate = !userId;
    const [user, setUser] = useState({});

    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:3001/api/users/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    throw err;
                })
        }
    }, [userId]);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = () => {
        axios
            .post('http://localhost:3001/api/users', user)
            .then(res => {
                alert(
                    `${isCreate ? 'Create' : 'Edit'} user ${JSON.stringify(res.data)} successfully!!!`
                );
            })
            .catch(err => {
                throw err;
            });
    }

    return (
        <div>
            <h1>User details</h1>
            <form>
                <div>
                    <label>Id</label>
                    <input type="text" name='id' value={user.id || ''} onChange={handleChange}/>
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" name='name' value={user.name || ''} onChange={handleChange}/>
                </div>
                <div>
                    <label>Birthday</label>
                    <input type="date" name='birthday' value={user.birthday || ''} onChange={handleChange}/>
                </div>
                <button type='button' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UserDetails;