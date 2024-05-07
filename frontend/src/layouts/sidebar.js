import React from 'react';
import { useLocation } from 'react-router-dom';

const SidebarMenu = () => {
    // Get the current location object
    const location = useLocation();

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to determine if a menu item should be active based on its path
    const isActive = (path) => {
        return currentPath === path;
    };

    const activeStyle = { background: '#333E54' };

    return (
        <div>
            {/* Your existing sidebar menu code */}
            <nav className="pc-sidebar">
                <div className="navbar-wrapper">
                    <div className="m-header">
                        <a href="../dashboard/index.html" className="b-brand text-primary">
                            {/* Change your logo from here */}
                            <img src="../assets/images/logo-white.svg" className="img-fluid logo-lg" alt="logo" />
                        </a>
                    </div>
                    <div className="navbar-content">
                        <ul className="pc-navbar">
                            <li className={`pc-item ${isActive('/dashboard')}`} style={isActive('/dashboard') ? activeStyle : null}>
                                <a href="/dashboard" className="pc-link">
                                    <span className="pc-micon">
                                        <i data-feather="home"></i>
                                    </span>
                                    <span className="pc-mtext">Dashboard</span>
                                </a>
                            </li>
                            <li className={`pc-item ${isActive('/user')}`} style={isActive('/user') ? activeStyle : null}>
                                <a href="/user" className="pc-link">
                                    <span className="pc-micon">
                                        <i data-feather="home"></i>
                                    </span>
                                    <span className="pc-mtext">User</span>
                                </a>
                            </li>
                            <li className={`pc-item ${isActive('/project')}`} style={isActive('/project') ? activeStyle : null}>
                                <a href="/project" className="pc-link">
                                    <span className="pc-micon">
                                        <i data-feather="home"></i>
                                    </span>
                                    <span className="pc-mtext">Project</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default SidebarMenu;
