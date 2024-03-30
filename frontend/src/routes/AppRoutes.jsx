import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';  
import UploadFile from '../pages/UploadFile';
import ConvocationList from '../pages/ConvocationList';

const App = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>   
      <Sidebar sx={{ width: 300, flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1, overflow: 'auto', paddingLeft: 2 }}>
        <Routes>
          <Route exact path="/" element={<Dashboard />} /> 
          <Route exact path="/upload" element={<UploadFile />} />
          <Route  exact path="/convocationlist" element={<ConvocationList />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
