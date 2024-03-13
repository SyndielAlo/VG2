// IndexHome.js

import React from 'react';
import NavCom from './nav';
import { Stack, Card, Typography, Button, Grid,CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';


const Index_Homendex = () => {



  return (
    <Stack spacing={10} alignItems="center">
      {/* Navigation bar */}
      <NavCom></NavCom>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Card content */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ color: '#294B29', fontWeight: 'bold' }}>
              Welcome to Visual Green
            </Typography>
            <Typography variant="h5" sx={{ color: '#120366', mb: 2 }}>
              Your Gateway to a Greener Tomorrow!
            </Typography>
            <Typography variant="body1" sx={{ color: '#001524', mb: 2 }}>
              VisualGreen, an innovative environmental system designed to monitor CO2 levels, UV light exposure,
              Temperature, and Humidity through sensors, all geared towards optimizing your plant's growth with the
              aid of data visualization tools within this web application.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ marginTop: 15, marginLeft: 30 }}>
            <Button variant="outlined" sx={{ height: '40px' }}>
              Help
            </Button>
            <Button variant="outlined" component={Link} to="/login" sx={{ height: '40px' }}>
              Login
            </Button>
          </Stack>
          </Card>
        </Grid>

        {/* Logo */}
        <Grid item xs={12} sm={6}>
        <Card sx={{ width: '100%', height: '62%', display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            src="/images/img/logo.png"
            alt="Visual Green Logo"
            sx={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Index_Homendex;
