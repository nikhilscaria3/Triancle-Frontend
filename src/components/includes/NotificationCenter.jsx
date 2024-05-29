import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { THEME_COLORS as theme } from "../../ThemeConfig";
import profile1 from "../../assets/icons/profile1.svg";
import profile2 from "../../assets/icons/profile2.svg";
import { axiosInstance } from "../../utils/baseurl";
import socket from "../../utils/socket";
const NotificationCenter = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [filterButton, setfilterButton] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const notificationRef = useRef(null);
  const [newUserNotification, setNewUserNotification] = useState([]);
  const [unreadNotifications, setUnreadNotificationsCount] = useState(0);
  const notificationCenterRef = useRef(null);

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };


  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/notification/notificationmessage', {
        params: {
          filterButton
        }
      });
      setNewUserNotification(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  useEffect(() => {
    fetchNotifications();
  }, [activeButton]);


  useEffect(() => {
    // Listen for new user notifications
    socket.on('documentassignnotification', (message) => {
      setNewUserNotification(prevNotifications => [...prevNotifications, message]);
      // Increment unread notifications count
      setUnreadNotificationsCount(prevCount => prevCount + 1);
    });

    return () => {
      // Clean up event listener
      socket.off('documentassignnotification');
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [notificationRef]);

  const handleButtonClick = (btn, index) => {
    if (btn === "All") {
      setfilterButton("")
    } else {
      setfilterButton(btn)
    }
    setActiveButton(index);
  };

  const notifications = [

  ];
  const buttons = ["All", "Issues", "Activities", "Requests", "Updates"];

  return (
    <>
      {showNotification && (
        <MainContainer ref={notificationRef}>
          <TopBtns>
            {buttons &&
              buttons.map((btn, index) => {
                return (
                  <Btn
                    key={index}
                    onClick={() => handleButtonClick(btn, index)}
                    className={activeButton === index ? "active" : ""}
                  >
                    {btn}
                  </Btn>
                );
              })}
          </TopBtns>
          <Head>Today</Head>
          {newUserNotification && newUserNotification.length > 0 ? (
            <ContentBox>
              {newUserNotification.map((notification, index) => {
                return (
                  <SingleNotification key={index}>
                    <Profile>
                      <Img src={profile1} alt="profilepic" />
                    </Profile>
                    <ContentBody>
                      <Content>{notification.notifieduser}</Content>
                      <Message>
                        {notification.notificationmessage}
                        <Time>{formatDateTime(notification.createdAt)}</Time>
                      </Message>
                    </ContentBody>
                  </SingleNotification>
                );
              })}
            </ContentBox>
          ) : notifications && notifications.length > 0 ? (
            <ContentBox>
              {notifications && notifications.map((notification, index) => {
                return (
                  <SingleNotification key={index}>
                    <Profile>
                      <Img src={notification.profile} alt="profilepic" />
                    </Profile>
                    <ContentBody>
                      <Content>{notification.content}</Content>
                      {notification.messages &&
                        notification.messages.map((message, msgIndex) => {
                          return (
                            <Message key={msgIndex}>
                              {message.message}
                              <Time>{message.time}Am</Time>
                            </Message>
                          );
                        })}
                    </ContentBody>
                  </SingleNotification>
                );
              })}
            </ContentBox>
          ) : (
            <ContentBox>
              <p>No Notifications Available</p>
            </ContentBox>
          )}
        </MainContainer>
      )}
    </>

  );
};

export default NotificationCenter;

const MainContainer = styled.div`
  //dont use positioning because positioning
  position: fixed;
  top: 8%;
  right: 2%;
  background-color: ${theme.notification};
  border-radius: 10px;
  padding: 10px;
  width: 30%;
  height: 80%;
  overflow-y: scroll;
  z-index: 9999;
`;

const TopBtns = styled.div`
  display: flex;
  gap: 20px;
`;

const Btn = styled.button`
  height: 35px;
  width: 100px;
  background-color: white;
  border-radius: 5px;
  &.active {
    background: ${theme.primary_btn};
    color: aliceblue;
  }
`;
const Head = styled.p`
  font-size: 15px;
  padding: 20px 0;
  border-bottom: 1px solid ${theme.border_4};
  color: white;
`;
const ContentBox = styled.div`
  margin-top: 20px;
`;
const Profile = styled.div`
  height: 35px;
  width: 35px;
  background-color: #084377;
  border-radius: 50%;
`;
const Img = styled.img`
  display: inline-block;
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const ContentBody = styled.div`
  width: 90%;
  margin-top: 8px;
`;
const Content = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: ${theme.text_2};
`;
const Message = styled.p`
  color: ${theme.text_10};
  line-height: 12px;
  background-color: ${theme.notification_message};
  padding: 20px;
  margin: 12px 0;
  font-size: 12px;
  font-weight: 300;
  border-radius: 5px;

  position: relative;
`;
const Time = styled.p`
  font-size: 11px;
  position: absolute;
  bottom: 5px;
  right: 8px;
`;
const SingleNotification = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  padding: 8px;
  margin-bottom: 10px;
  background-color: ${theme.notification_content};
  border-radius: 5px;
`;
