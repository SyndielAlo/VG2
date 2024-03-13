import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/setup';

const UsernameComponent = () => {
    const [userData, setUserData] = useState([]);

    const getUsers = async () => {
        const userRef = collection(db, 'users');
        try {
            const data = await getDocs(userRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                uid: doc.id, // Using 'uid' as the key instead of 'id'
            }));
            setUserData(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {/* Render each user's data */}
            {userData.map((user) => (
                <div key={user.uid}>
                    {/* Render user's avatar and username */}
                    <Avatar src={user.avatarUrl} alt={user.username} />
                    <Typography>{user.username}</Typography>
                </div>
            ))}
        </div>
    );
};

export default UsernameComponent;
