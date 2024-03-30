import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { Box } from '@mui/system';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import UploadFile from '../pages/UploadFile';
import ConvocationList from '../pages/ConvocationList';

const App = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar with fixed width */}
      <Sidebar sx={{ width: 300, flexShrink: 0 }} />
      {/* Main content container */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', paddingLeft: 2 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/convocationlist" element={<ConvocationList />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;