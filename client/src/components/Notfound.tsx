import { Box, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <Stack sx={{ textAlign: 'center' }}>
    <Box sx={{ padding: 2 }}>
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
      width="1000" 
      height="500"
    /></Box>
    <Link to="/" className="link-home">
      Go Home
    </Link>
    </Stack>
  </div>
);

export default NotFound;
