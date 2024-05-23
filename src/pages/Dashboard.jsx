import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Dashboard = ({ Mleft }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: `calc(50% + ${Mleft}px)`,
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '60%',
        maxWidth: 600,
        padding: 4,
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderRadius: 4,
      }}
    >
      <Typography variant="h4" sx={{ color: 'blue', fontWeight: 'bold', mb: 2 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Welcome to the Dashboard! Here you can find all the important information and actions related to convocation
      </Typography>
      <Button variant="contained" color="primary" sx={{ fontSize: '1.2rem' }}>
        View Statistics
      </Button>
    </Box>
  );
};

export default Dashboard;
