import React from 'react';
// import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';

export function Header() {
  return (
    <AppBar position="sticky" sx={{width:'100%', borderRadius:'10px', color:"white", backgroundColor:"darkblue"}}>
      <Toolbar>
        {/* <Container> */}
          <Typography variant="h6" sx={{flexGrow: 1 }}>
            Servicio de Orientación Académica
          </Typography>
           {/* color:"darkblue", backgroundColor:"white", */}
        {/* </Container> */}
      </Toolbar>
    </AppBar>
  );
};

