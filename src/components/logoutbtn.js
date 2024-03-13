import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/'); // Redirect to login page after successful logout
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };
    return (
        <ListItemButton onClick={handleLogout}> {/* Replace with handleLogout function */}
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItemButton>
    );
};

export default LogoutButton;
