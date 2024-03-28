import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UploadFile from '../pages/UploadFile';
import Dashboard from '../pages/Dashboard';
import Sidebar from '../components/Sidebar';
import ConvocationList from '../pages/ConvocationList';
import './AppRoutes.css'; // Assuming you have a CSS file for AppRoutes

export default function AppRoutes() {
    return (
        <div className='App'>
            <Sidebar/>
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/upload" element={<UploadFile/>} />
                    <Route path="/convocationlist" element={<ConvocationList/>} />
                </Routes>
            </div>
        </div>
    );
}