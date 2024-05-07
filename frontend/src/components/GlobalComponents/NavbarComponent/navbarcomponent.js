import React, { useEffect, useState } from "react";
import './navbarcomponent.css'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Popover, Badge, IconButton, Avatar, MenuItem, Typography, Divider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { axiosInstance } from "../../../util/baseurl";
import io from 'socket.io-client';
import NotificationCenter from "../../NotificationComponent";
import SidebarMenu from "../../../layouts/sidebar";
import { checkAdminStatus } from "../../../Auth/UserAuth"; // Import the isAuthenticated function
const socket = io('http://localhost:5000'); // Replace with your server URL


const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: 'eva:home-fill',
    },
    {
        label: 'Profile',
        icon: 'eva:person-fill',
    },
    {
        label: 'Settings',
        icon: 'eva:settings-2-fill',
    },
];

const Navbar = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("abcd@gmail.com"); // default user email for testing
    const [userStatus, setuserStatus] = useState(); // default user email for testing
    const [username, setuserName] = useState(); // default user email for testing

    // Ensure userEmail is always a string

    const atIndex = typeof userEmail === 'string' ? userEmail.indexOf('@') : -1;
    const userName = atIndex !== -1 ? userEmail.slice(0, atIndex) : userEmail;

    // Retrieve email from localStorage
    const userToken = localStorage.getItem("refreshtoken");

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/user/getuser', {
                params: {
                    token: userToken
                }
            });
            if (response) {
                setuserStatus(response.data.status);
                setUserEmail(response.data.email);
                setuserName(response.data.username);

            }
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []); // Empty dependency array to execute only once on component mount

    const [notificationOpen, setNotificationOpen] = useState(null);
    const [avatarOpen, setAvatarOpen] = useState(null);
    const [newUserNotification, setNewUserNotification] = useState([]);
    const [unreadNotifications, setUnreadNotificationsCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const response = await axiosInstance.get('/notification/notificationmessage');
            setNewUserNotification(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };


    useEffect(() => {

        fetchNotifications();
    }, []);


    useEffect(() => {
        // Listen for new user notifications
        socket.on('message', (message) => {
            setNewUserNotification(prevNotifications => [...prevNotifications, message]);
            // Increment unread notifications count
            setUnreadNotificationsCount(prevCount => prevCount + 1);
        });

        return () => {
            // Clean up event listener
            socket.off('message');
        };
    }, []);

    const handleNotificationOpen = (event) => {
        setNotificationOpen(event.currentTarget);
        setNotificationOpen(!notificationOpen)
        fetchNotifications();
        // Reset unread notifications count when notification popover is opened
        setUnreadNotificationsCount(0);
    };



    const handlelogout = () => {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        navigate('/');
    };

    const handleNotificationClose = () => {
        setNotificationOpen(null);
    };

    const handleAvatarOpen = (event) => {
        setAvatarOpen(event.currentTarget);
    };

    const handleAvatarClose = () => {
        setAvatarOpen(null);
    };




    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
                        <Badge
                            sx={{ marginRight: 3 }}
                            badgeContent={unreadNotifications} // Use unreadNotificationsCount for badge content
                            color="error"
                            variant={unreadNotifications > 0 ? unreadNotifications : "standard"} // Use dot variant when unreadNotificationsCount > 0
                        >
                            <IconButton
                                onClick={handleNotificationOpen}
                                sx={{
                                    width: 40,
                                    height: 40,

                                }}
                            >
                                <i class="fa fa-bell fa-1x"></i>
                            </IconButton>
                        </Badge>
                        {notificationOpen && <NotificationCenter notificationdata={newUserNotification} />}
                        {/* <div className="d-flex">
                            <IconButton
                                onClick={handleAvatarOpen}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                                }}
                            >
                                <Avatar
                                    src="/static/images/avatar/2.jpg"
                                    alt={userName}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        background: "black",
                                        border: (theme) => `solid 2px ${theme.palette.background.default}`,
                                    }}
                                >
                                    {userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Popover
                                open={!!avatarOpen}
                                anchorEl={avatarOpen}
                                onClose={handleAvatarClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                PaperProps={{
                                    sx: {
                                        p: 0,
                                        mt: 1,
                                        ml: 0.75,
                                        width: 200,
                                    },
                                }}
                            >

                                <Box sx={{ my: 1.5, px: 2 }}>

                                    <Typography variant="subtitle2" noWrap>
                                        {userName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                        {userEmail}
                                    </Typography>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                {MENU_OPTIONS.map((option) => (
                                    <MenuItem key={option.label} onClick={handleAvatarClose}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
                                <MenuItem
                                    disableRipple
                                    disableTouchRipple
                                    onClick={handlelogout}
                                    sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                                >
                                    Logout
                                </MenuItem>
                            </Popover>
                            <Typography variant="subtitle2" noWrap>
                                {userStatus}
                            </Typography>
                        </div> */}

                        <Profile>
                            <ProfileContainer>
                                <ProfileIcon
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    alt="Profile"
                                />
                            </ProfileContainer>
                            <Details>
                                <UserDetails onClick={handleAvatarOpen}>
                                    {username ? <UserName>{username}</UserName>
                                        : <UserName>{userName}</UserName>}
                                    <UserRole>{userStatus}</UserRole>
                                </UserDetails>
                                <Popover
                                    open={!!avatarOpen}
                                    anchorEl={avatarOpen}
                                    onClose={handleAvatarClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            p: 0,
                                            mt: 1,
                                            ml: 0.75,
                                            width: 200,
                                        },
                                    }}
                                >

                                    <Box sx={{ my: 1.5, px: 2 }}>

                                        <Typography variant="subtitle2" noWrap>
                                            {username}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                            {userEmail}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderStyle: 'dashed' }} />
                                    {/* {MENU_OPTIONS.map((option) => (
                                        <MenuItem key={option.label} onClick={handleAvatarClose}>
                                            {option.label}
                                        </MenuItem>
                                    ))} */}
                                    <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
                                    <MenuItem
                                        disableRipple
                                        disableTouchRipple
                                        onClick={handlelogout}
                                        sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Popover>
                            </Details>
                        </Profile>
                    </Toolbar>
                </AppBar>
            </Box >
        </>


    );
};



const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileContainer = styled.div`
  width: 45px;
  height: 45px;
`;

const ProfileIcon = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const UserDetails = styled.div`
  margin-left: 18px;
`;

const UserName = styled.p`
  color: #000;
  font-size: 18px;
  text-transform: capitalize;
  margin: 0 auto;
`;

const UserRole = styled.p`
  color: #747474;
  margin: 0 auto;
  font-size: 14px;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 10px;
`;

const DownIcon = styled.div`
  width: 28px;
  height: 28px;
`;

const LogImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  object-fit: cover;
`;


export default Navbar;
