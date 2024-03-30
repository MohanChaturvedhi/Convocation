import React from 'react';
import { Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container justifyContent="flex-start" alignItems="center" sx={{ height: '100%' }}>
      <Grid item xs={12}>
        <h1 style={{ marginLeft: '20px' }}>Dashboard</h1>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
