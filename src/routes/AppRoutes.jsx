// App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';  
import UploadFile from '../pages/UploadFile';
import ConvocationList from '../pages/ConvocationList';

const App = () => {
   const [marginLeft, setMarginLeft] = useState(270);
   const ChangeMargin = (marginLeftValue) => {
         setMarginLeft(marginLeftValue);
   }; 
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>   
      <Sidebar ChangeMargin={ChangeMargin} />
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Routes>
          <Route exact path="/" element={<Dashboard Mleft={marginLeft} />} /> 
          <Route exact path="/upload" element={<UploadFile Mleft={marginLeft} />} />
          <Route exact path="/convocationlist" element={<ConvocationList Mleft={marginLeft} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
