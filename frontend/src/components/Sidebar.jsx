import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ListIcon from '@mui/icons-material/List';

const Sidebar = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <Box
      sx={{
        width: 300,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        overflowY: 'auto',
        padding: 2,
      }}
    >
      <List>
        <ListItem button component={NavLink} to="/" exact>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="MIS" />
        </ListItem>
        <Divider />
        <ListItem button onClick={toggleDashboard}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
          {showDashboard ? '➖' : '➕'}
        </ListItem>
        {showDashboard && (
          <>
            <ListItem button component={NavLink} to="/upload">
              <ListItemIcon><UploadFileIcon /></ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItem>
            <ListItem button component={NavLink} to="/convocationlist">
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary="ConvocationList" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;