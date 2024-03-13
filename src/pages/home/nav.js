import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#0D9276",
});

const Title = styled(Typography)({
  flexGrow: 1,
  marginLeft: '16px', // Adjust this value as needed
});

const NavCom = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Title variant="h5">
          VisualGreen
        </Title>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavCom;
