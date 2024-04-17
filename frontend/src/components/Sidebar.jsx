import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, ListItemIcon , useMediaQuery, useTheme, IconButton, Drawer } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
const Sidebar = ({ ChangeMargin }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    ChangeMargin(isLargeScreen ? 300 : 20);
  }, [isLargeScreen, ChangeMargin]);

  const drawer = (
    <Box
      sx={{
        width: isLargeScreen ? 250 : '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(58, 53, 65, 0.87)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        overflowY: 'auto',
        padding: 2,
      }}
    >
      <List>
        <ListItem button component={NavLink} to="/">
          <ListItemIcon>
            <MenuIcon fontSize="large" style={{ color: '#fff' }} /> 
          </ListItemIcon>
          <ListItemText primary="MIS" style={{ color: '#fff' }} /> 
        </ListItem>
        <Divider />
        <ListItem button onClick={toggleDashboard}>
          <ListItemIcon><DashboardIcon style={{ color: '#fff' }} /></ListItemIcon> 
          <ListItemText primary="Dashboard" style={{ color: '#fff' }} /> 
          {showDashboard ? '➖' : '➕'}
        </ListItem>
        {showDashboard && (
          <>
            <ListItem button component={NavLink} to="/upload">
              <ListItemIcon><UploadFileIcon style={{ color: '#fff' }} /></ListItemIcon> 
              <ListItemText primary="Upload" style={{ color: '#fff' }} /> 
            </ListItem>
            <ListItem button component={NavLink} to="/convocationlist">
              <ListItemIcon><ListIcon style={{ color: '#fff' }} /></ListItemIcon> 
              <ListItemText primary="ConvocationList" style={{ color: '#fff' }} /> 
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  
  return (
    <div>
      {!isLargeScreen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isLargeScreen ? 'permanent' : 'temporary'}
        open={isLargeScreen ? true : open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};
export default Sidebar;