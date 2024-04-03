import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, ListItemIcon , useMediaQuery, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : 280,
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
        <ListItem button component={NavLink} to="/">
          <ListItemIcon>
          <MenuIcon fontSize="large" style={{ color: '#3f51b5' }} />
          </ListItemIcon>
          <ListItemText primary="MIS" />
        </ListItem>
        <Divider />
        <ListItem button onClick={toggleDashboard}>
          <ListItemIcon><DashboardIcon style={{ color: '#ff5722' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
          {showDashboard ? '➖' : '➕'}
        </ListItem>
        {showDashboard && (
          <>
            <ListItem button component={NavLink} to="/upload">
              <ListItemIcon><UploadFileIcon style={{ color: '#f44336' }} /></ListItemIcon>
              <ListItemText primary="Upload" />
            </ListItem>
            <ListItem button component={NavLink} to="/convocationlist">
              <ListItemIcon><ListIcon style={{ color: '#4caf50' }} /></ListItemIcon>
              <ListItemText primary="ConvocationList" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
