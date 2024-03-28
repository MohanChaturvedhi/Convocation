import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="sidebar">
           <Link to="/" className="option">MIS</Link>
            <div className="dashboard" onClick={() => setShowOptions(!showOptions)}>
                Dashboard
            </div>
            {showOptions && (
                <div className="options">
                    <Link to="/upload" className="option">Upload File</Link>
                    <Link to="/convocationlist" className="option">ConvocationList</Link>
                </div>
            )}
        </div>
    );
}

export default Sidebar;