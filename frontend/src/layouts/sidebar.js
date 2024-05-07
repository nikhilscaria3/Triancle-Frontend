import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import image from '../assets/images/logo2.jpg'
import { axiosInstance } from '../util/baseurl';

const SidebarMenu = () => {
    // Get the current location object
    const location = useLocation();
    const [userStatus, setuserStatus] = useState(); // default user email for testing

    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Function to determine if a menu item should be active based on its path
    const isActive = (path) => {
        return currentPath === path;
    };

    const userToken = localStorage.getItem("accesstoken");

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/user/getuser', {
                params: {
                    token: userToken
                }
            });
            if (response) {
                setuserStatus(response.data.status);

            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []); // Empty dependency array to execute only once on component mount



    const activeStyle = { background: '#333E54' };

    return (
        <div>
            <div className="loader-bg">
                <div className="loader-track">
                    <div className="loader-fill"></div>
                </div>
            </div>
            {/* Your existing sidebar menu code */}
            <nav className="pc-sidebar">
                <div className="navbar-wrapper">
                    <div className="m-header">
                        <a href="/dashboard">
                            <img src={image} alt="" className="w-100" />
                        </a>
                    </div>
                    <div className="navbar-content">
                        <ul className="pc-navbar">
                            <li className={`pc-item ${isActive('/dashboard')}`} style={isActive('/dashboard') ? activeStyle : null}>
                                <Link to="/dashboard" className="pc-link">
                                    <span className="pc-micon">
                                        <i class='bx bxs-dashboard' ></i>
                                    </span>
                                    <span className="pc-mtext">Dashboard</span>
                                </Link>
                            </li>

                            {userStatus === "Admin" && (
                                <>
                                    <li className={`pc-item ${isActive('/user')}`} style={isActive('/user') ? activeStyle : null}>
                                        <Link to="/user" className="pc-link">
                                            <span className="pc-micon">
                                                <i className='bx bx-user'></i>
                                            </span>
                                            <span className="pc-mtext">User</span>
                                        </Link>
                                    </li>
                                    <li className={`pc-item ${isActive('/project')}`} style={isActive('/project') ? activeStyle : null}>
                                        <Link to="/project" className="pc-link">
                                            <span className="pc-micon">
                                                <i className='bx bx-code-curly'></i>
                                            </span>
                                            <span className="pc-mtext">Project</span>
                                        </Link>
                                    </li>

                                </>
                            )}
                            <li className={`pc-item ${isActive('/file')}`} style={isActive('/file') ? activeStyle : null}>
                                <Link to="/file" className="pc-link">
                                    <span className="pc-micon">
                                        <i class='bx bx-file' ></i>
                                    </span>
                                    <span className="pc-mtext">File</span>
                                </Link>
                            </li>

                            <li className={`pc-item ${isActive('/assignedfile')}`} style={isActive('/assignedfile') ? activeStyle : null}>
                                <Link to="/assignedfile" className="pc-link">
                                    <span className="pc-micon">
                                        <i class='bx bxs-file-blank' ></i>
                                    </span>
                                    <span className="pc-mtext">Assign File</span>
                                </Link>
                            </li>
                            <li className={`pc-item ${isActive('/favfile')}`} style={isActive('/favfile') ? activeStyle : null}>
                                <Link to="/favfile" className="pc-link">
                                    <span className="pc-micon">
                                        <i class='bx bxs-star'></i>
                                    </span>
                                    <span className="pc-mtext">Fav File</span>
                                </Link>
                            </li>
                            {userStatus === "Admin" && (
                                <>
                                    <li className={`pc-item ${isActive('/category')}`} style={isActive('/category') ? activeStyle : null}>
                                        <Link to="/category" className="pc-link">
                                            <span className="pc-micon">
                                                <i class='bx bx-category' ></i>
                                            </span>
                                            <span className="pc-mtext">Category</span>
                                        </Link>
                                    </li>
                                    <li className={`pc-item ${isActive('/subcategory')}`} style={isActive('/subcategory') ? activeStyle : null}>
                                        <Link to="/subcategory" className="pc-link">
                                            <span className="pc-micon">
                                                <i class='bx bx-list-ul' ></i>
                                            </span>
                                            <span className="pc-mtext">Sub Category</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default SidebarMenu;
