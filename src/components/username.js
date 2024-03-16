import React from 'react';
import { Avatar, Typography } from '@mui/material';
import { useAuth } from '../pages/auth/authprovider';  // Import the appropriate context or hook for accessing current user data

const CurrentUserAvatar = () => {
  const { currentUser } = useAuth(); // Replace useAuth with the appropriate hook or context


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {currentUser && (
        <Avatar alt={currentUser.username} src={currentUser.picture} />
      )}
      {currentUser && (
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          {currentUser.email}
        </Typography>
      )}
    </div>
  );
};

export default CurrentUserAvatar;

