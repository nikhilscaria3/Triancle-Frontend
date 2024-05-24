import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { THEME_COLORS as colors } from "../../../ThemeConfig";
import { Popover, Box, Typography, Divider, MenuItem } from "@mui/material";
import menu from "../../../assets/icons/menu.svg";
import searchicon from "../../../assets/icons/search-icon.svg";
import Notificationicon from "../../../assets/icons/bell.svg";
import down from "../../../assets/icons/down.svg";
import SearchBar from "../../includes/SearchBar";
import NotificationCenter from "../../includes/NotificationCenter";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../utils/baseurl";
import { Link } from "react-router-dom";

export default function Header({ toggleIconsOnly }) {
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // default user email for testing
  const [avatarOpen, setAvatarOpen] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/user/getuser");
      console.log("response.data", response.data);
      if (response) {
        setUserData(response.data.userdata);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array to execute only once on component mount

  const handleLogout = () => {
    // Perform logout actions (clear authentication tokens, reset state, etc.)
    // Remove the token from local storage
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    // Redirect the user to the login page
    navigate("/login");
  };

  const handleAvatarOpen = (event) => {
    setAvatarOpen(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarOpen(null);
  };

  const toggleNotificationCenter = () => {
    setShowNotificationCenter(!showNotificationCenter);
  };

  const handleProfileNavigate = () => {
    navigate("/profile", { state: userData });
  };

  return (
    <>
      <Body>
        <MainContainer>
          <ItemContainer>
            <Container>
              <Left>
                <LogoContainer>
                  <Menu src={menu} alt="Menu" onClick={toggleIconsOnly} />
                </LogoContainer>
              </Left>
            </Container>

            <RightContainer>
              <Right>
                <SearchBar placeholder={"Search"} />
                <NotificationContainer>
                  <NotificationIconContainer onClick={toggleNotificationCenter}>
                    <NotificationIcon
                      src={Notificationicon}
                      alt="Notification"
                    />
                  </NotificationIconContainer>
                  <NotificationCount>92</NotificationCount>
                </NotificationContainer>
              </Right>


              <Profile>
                {userData ? (
                  <>
                    <ProfileContainer>
                      <ProfileIcon src={userData.image} alt="Profile" />
                    </ProfileContainer>
                    <Details>
                      <UserDetails>
                        <UserName>{userData.name}</UserName>
                        <UserRole>Admin</UserRole>
                      </UserDetails>
                      <Option>
                        <DownIcon onClick={handleAvatarOpen}>
                          <LogImg src={down} alt="log" />{" "}
                        </DownIcon>
                      </Option>
                      <Popover
                        open={!!avatarOpen}
                        anchorEl={avatarOpen}
                        onClose={handleAvatarClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        sx={{
                          top: 12,
                        }}
                        PaperProps={{
                          sx: {
                            p: 0,
                            mt: 1,
                            ml: 0.75,
                            width: 200,
                            background: `${colors.notification}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            my: 1.5,
                            px: 2,
                            display: "grid",
                            gap: "12px",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#fff" }}
                            fontFamily={"Poppins"}
                            textAlign={"center"}
                            borderBottom={`1px solid ${colors.border_3}`}
                            padding={"12px 0px"}
                          >
                            {userData.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#c4c4c4" }}
                            noWrap
                            fontFamily={"Poppins"}
                            textAlign={"center"}
                            borderBottom={`1px solid ${colors.border_3}`}
                            padding={"12px 0px"}
                          >
                            {userData.email}
                          </Typography>
                          <Button
                            onClick={handleProfileNavigate}
                            className="profilebtn"
                          >
                            Profile
                          </Button>
                          <Button className="profilebtn resetbtn">
                            <Link to="/resetpassword">Reset Password</Link>
                          </Button>
                        </Box>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        {/* {MENU_OPTIONS.map((option) => (
                                        <MenuItem key={option.label} onClick={handleAvatarClose}>
                                            {option.label}
                                        </MenuItem>
                                    ))} */}
                        <Divider sx={{ borderStyle: "dashed", m: 0 }} />
                        <MenuItem
                          disableRipple
                          disableTouchRipple
                          onClick={handleLogout}
                          sx={{
                            typography: "body2",
                            py: 1.5,
                            background: `${colors.error_text}`,
                            color: "#fff",
                            display: "grid",
                            justifyContent: "center",
                            "&:hover": {
                              fontWeight: 600,
                              color: "red",
                              backgroundColor: `${colors.background_1}`,
                            },
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Popover>
                    </Details>
                  </>
                ) : (
                  <>
                    <ProfileContainer>
                      <ProfileIcon
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        alt="Profile"
                      />
                    </ProfileContainer>
                    <Details>
                      <UserDetails>
                        <UserName>John Doe</UserName>
                        <UserRole>Admin</UserRole>
                      </UserDetails>
                      <Option>
                        <DownIcon onClick={handleAvatarOpen}>
                          <LogImg src={down} alt="log" />{" "}
                        </DownIcon>
                      </Option>
                      <Popover
                        open={!!avatarOpen}
                        anchorEl={avatarOpen}
                        onClose={handleAvatarClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        sx={{
                          top: 12,
                        }}
                        PaperProps={{
                          sx: {
                            p: 0,
                            mt: 1,
                            ml: 0.75,
                            width: 200,
                            background: `${colors.notification}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            my: 1.5,
                            px: 2,
                            display: "grid",
                            gap: "12px",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "#fff" }}
                            noWrap
                            fontFamily={"Poppins"}
                            textAlign={"center"}
                            borderBottom={`1px solid ${colors.border_3}`}
                            padding={"12px 0px"}
                          >
                            Dummy
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#c4c4c4" }}
                            noWrap
                            fontFamily={"Poppins"}
                            textAlign={"center"}
                            borderBottom={`1px solid ${colors.border_3}`}
                            padding={"12px 0px"}
                          >
                            Dummy
                          </Typography>
                          <Button
                            onClick={handleProfileNavigate}
                            className="profilebtn"
                          >
                            Profile
                          </Button>
                          <Button className="profilebtn resetbtn">
                            <Link to="/resetpassword">Reset Password</Link>
                          </Button>
                        </Box>
                        <Divider sx={{ borderStyle: "dashed" }} />
                        {/* {MENU_OPTIONS.map((option) => (
                                        <MenuItem key={option.label} onClick={handleAvatarClose}>
                                            {option.label}
                                        </MenuItem>
                                    ))} */}
                        <Divider sx={{ borderStyle: "dashed", m: 0 }} />
                        <MenuItem
                          disableRipple
                          disableTouchRipple
                          onClick={handleLogout}
                          sx={{
                            typography: "body2",
                            py: 1.5,
                            background: `${colors.error_text}`,
                            color: "#fff",
                            display: "grid",
                            justifyContent: "center",
                            "&:hover": {
                              fontWeight: 600,
                              color: "red",
                              backgroundColor: `${colors.background_1}`,
                            },
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Popover>
                    </Details>
                  </>
                )}
              </Profile>
            </RightContainer>
          </ItemContainer>
        </MainContainer>
      </Body>

      {showNotificationCenter && <NotificationCenter />}
    </>
  );
}

const Body = styled.div``;
const MainContainer = styled.div`
  border-bottom: 4px solid #f1f1f1;
  border-left: 1px solid #e1e1e1;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 30%;
`;

const LogoContainer = styled.div`
  width: 55px;
  height: 55px;
  cursor: pointer;
`;

const Menu = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 5px;
  width: 50%;
`;

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-left: 20px;
`;

const NotificationIconContainer = styled.div`
  width: 26px;
  height: 26px;
`;

const NotificationCount = styled.div`
  position: absolute;
  left: 40px;
  top: 8px;
  border-radius: 50%;
  background: red;
  color: #fff;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const NotificationIcon = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const RightContainer = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: flex-end;
  align-items: center;
  width: 70%;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 24%;
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
  font-size: 18px;
  text-transform: capitalize;
  margin: 0 auto;
`;

const UserRole = styled.p`
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

const Button = styled.button`
  &.profilebtn {
    color: ${colors.text_2};
    font-family: "Poppins";
    font-size: 14px;
    padding: 12px 0;
    border-bottom: 1px solid ${colors.border_3};

    &:last-child {
      border-bottom: none;
    }
  }

  &.resetbtn a {
    color: ${colors.text_2};
    text-transform: uppercase;
    font-weight: 500;
    background-color: ${colors.primary_btn};
    padding: 12px;
    border-radius: 8px;
    &:hover {
      color: #fff;
    }
  }
`;
