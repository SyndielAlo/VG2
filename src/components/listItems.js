import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseIcon from '@mui/icons-material/House';
import GrassIcon from '@mui/icons-material/Grass';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutButton from './logoutbtn';
import { Link } from 'react-router-dom'; // Import Link component

export const mainListItems = (
  <React.Fragment>
    <ListItemButton
      component={Link}
      to="/Home"
      sx={{
        display: 'flex',
        alignItems: 'center', // Center the items vertically
        justifyContent: 'center', // Center the items horizontally
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
      component={Link}
      to="/PlantPage"
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
      component={Link}
      to="/SettingsPage"
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
    <LogoutButton />
  </React.Fragment>
);

export default mainListItems;
