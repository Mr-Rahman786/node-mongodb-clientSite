import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUser, setDisplayUsers] = useState(users);
    const handleDelete = user => {
        const agree = window.confirm(`are you sure to delete the name ${user.name}`)
        console.log(agree)
        if (agree) {
            // console.log('delete data',user._id)
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
            .then(res=>res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('User delete successfully')
                        const remainingUser = displayUser.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUser);
                    }
                })
        }
    }
    return (
        <div>
            <h2>Users :{displayUser.length}</h2>
            <div>
                {
                    displayUser.map(user => <p key={user._id}>
                        {user.name}
                        {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>update</button>
                        </Link>
                        <button onClick={() => handleDelete(user)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;