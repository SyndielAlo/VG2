import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseIcon from '@mui/icons-material/House';
import GrassIcon from '@mui/icons-material/Grass';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'; // Import Link component
import LogoutButton from './logoutbtn';
import CurrentUserAvatar from './username';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton
      sx={{
        display: 'flex',
        alignItems: 'center', // Center the items vertically
        justifyContent: 'center', // Center the items horizontally
      }}
    >
      
    </ListItemButton>
    <ListItemButton
      component={Link} // Use Link component instead of ListItemButton
      to="/Home" // Specify the destination path
      sx={{
        '&:hover, &:focus': {
          bgcolor: 'rgba(0, 105, 92, 0.2)', // Green color with 20% opacity
        },
      }}
    >
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
      <ListItemText primary="GreenHouse Monitor" />
    </ListItemButton>
    <ListItemButton
      component={Link} // Use Link component instead of ListItemButton
      to="/PlantPage" // Specify the destination path
      sx={{
        '&:hover, &:focus': {
          bgcolor: 'rgba(0, 105, 92, 0.2)', // Green color with 20% opacity
        },
      }}
    >
      <ListItemIcon>
        <GrassIcon />
      </ListItemIcon>
      <ListItemText primary="Plant Records" />
    </ListItemButton>
    <ListItemButton
      component={Link} // Use Link component instead of ListItemButton
      to="/SettingsPage" // Specify the destination path
      sx={{
        '&:hover, &:focus': {
          bgcolor: 'rgba(0, 105, 92, 0.2)', // Green color with 20% opacity
        },
      }}
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton
      component={Link} // Use Link component instead of ListItemButton
      to="/SettingsPage" // Specify the destination path
      sx={{
        '&:hover, &:focus': {
          bgcolor: 'rgba(0, 105, 92, 0.2)', // Green color with 20% opacity
        },
      }}
    >
      
    </ListItemButton>
    <LogoutButton/>
  </React.Fragment>
);

export default mainListItems;
