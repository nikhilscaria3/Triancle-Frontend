import React, { useState } from "react";
import styled from "styled-components";
import { THEME_COLORS as theme } from "../ThemeConfig";
import profile1 from "../assets/images/logo.png";

const NotificationCenter = ({ notificationdata }) => {
    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

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

    const buttons = ["All", "Issues"];
    return (
        <>
            <MainContainer>
                <TopBtns>
                    {buttons &&
                        buttons.map((btn, index) => {
                            return (
                                <Btn
                                    key={index}
                                    onClick={() => handleButtonClick(index)}
                                    className={activeButton === index ? "active" : ""}
                                >
                                    {btn}
                                </Btn>
                            );
                        })}
                </TopBtns>
                <Head>Today</Head>
                <ContentBox>
                    {notificationdata.map((notification, index) => {
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
            </MainContainer>
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
  overflow-y: auto;
  max-height: 60vh;

  /* Target the scrollbar in WebKit-based browsers */
  ::-webkit-scrollbar {
    width: 4px; /* Set the width of the scrollbar */
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Set the background color of the scrollbar track */
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; /* Set the color of the scrollbar handle */
    border-radius: 10px; /* Add rounded corners to the scrollbar handle */
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Change the color of the scrollbar handle on hover */
  }
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
