import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState();
    
    const handleAddUser = event => {
        event.preventDefault();
        console.log(user)
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('User added sucessfully')
                    event.target.reset();
                }
        })

    }
    const handleInputBlur = event => {
        const value = event.target.value;
        const field = event.target.name;;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser)
    }
    return (
        <div>
            <h2>this is add user components</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name="name" placeholder='name' />
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" placeholder='email' />
                <br />
                <button type="submit">Add user</button>
            </form>
        </div>
    );
};

export default AddUser;