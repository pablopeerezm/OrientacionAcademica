import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282c34',
        color: 'white',
        height: '60px',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Servicio de Orientación. Todos los derechos reservados.
        <br />
        <Box color="inherit" sx={{ textDecoration: 'none' }}>
          Pablo Pérez Martínez
        {' | '}
          Programación web - Universidad Europea del Atlántico
        </Box>

      </Typography>
    </Box>
  );
};
