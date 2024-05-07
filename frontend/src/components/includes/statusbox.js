import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import "../../assets/css/fontStyles.css";
//image imports
import projects from "../../assets/icons/projects.svg";
import attendance from "../../assets/icons/attendance-color.svg";
import requests from "../../assets/icons/request-color.svg";
import { useCheckAdminStatus } from "../../Auth/UserAuth";

const StatusBox = ({ count }) => {
  const getStatusLabel = (status) => {
    return status ? "Active" : "Inactive";
  };

  const isAdmin = useCheckAdminStatus();

  let boxContents = [];

  if (isAdmin) {
    boxContents = [
      {
        icon: attendance,
        title: "Users",
        alt: "Projects",
        titleValue: count.userCount,
        colorCounts: count.userStatusCounts,
        type: "user",
        color: themes.clients,
        bg: "#FFFCDC",
      },
      {
        icon: projects,
        title: "Projects",
        alt: "Attendances",
        titleValue: count.projectCount,
        colorCounts: count.projectStatusCounts,
        type: "project",
        color: themes.projects,
        bg: "#DAFFF4",
      },
      {
        icon: requests,
        title: "Files",
        alt: "Requests",
        titleValue: count.fileCount,
        colorCounts: count.fileStatusCounts,
        type: "file",
        color: themes.employees,
        bg: "#F2EEFF",
      }
    ];
  } else {
    boxContents = [
      {
        icon: requests,
        title: "Files",
        alt: "Requests",
        titleValue: count.fileCount,
        colorCounts: count.fileStatusCounts,
        type: "file",
        color: themes.employees,
        bg: "#F2EEFF",
      }
    ];
  }


  return (
    <MainContainer>
      {boxContents.map((item, index) => (
        <BoxContainer key={index} style={{ color: item.color }}>
          <BoxTop>
            <BoxTopLeft style={{ background: item.bg }}>
              <BoxTopLeftIcon src={item.icon} alt={item.alt} />
            </BoxTopLeft>
            <BoxTopRight>
              <BoxTopRightHead>{item.title}</BoxTopRightHead>
              <BoxTopRightSubHead>{item.titleValue}</BoxTopRightSubHead>
            </BoxTopRight>
          </BoxTop>
          <Line style={{ border: `0.5px solid ${item.color}` }}></Line>
          <BoxBottom>
            {item.colorCounts && item.colorCounts.map((statusItem, index) => (
              <BoxBottomContent key={index}>
                {item.type === "user" ?
                  <BoxBottomSubHead>{getStatusLabel(statusItem.status)}</BoxBottomSubHead>
                  :
                  <BoxBottomSubHead>{statusItem.status}</BoxBottomSubHead>
                }
                <BoxBottomValue>{statusItem.count}</BoxBottomValue>
              </BoxBottomContent>
            ))}
          </BoxBottom>
        </BoxContainer>
      ))}
    </MainContainer>
  );
}

export default StatusBox;


const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;
const BoxContainer = styled.div`
  padding: 5%;
  box-shadow: 4px 4px 4px 0 rgba(71, 71, 71, 0.5);
  background-color: #ffffff;
  border-radius: 20px;
`;
const BoxTop = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
`;
const Line = styled.div``;
const BoxBottom = styled.div`
  padding-top: 10px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
`;
const BoxTopLeft = styled.div`
  border-radius: 18px;
  height: 58px;
  width: 58px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoxTopRight = styled.div``;
const BoxTopLeftIcon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  padding: 10%;
`;

const BoxTopRightHead = styled.h4`
  font-family: "Poppins";
  font-weight: 300;
  font-size: 16px;
`;
const BoxTopRightSubHead = styled.h2`
  font-family: "Poppins";
  font-weight: 600;
  font-size: 25px;
`;
const BoxBottomContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const BoxBottomSubHead = styled.h4`
  font-family: "Poppins";
  font-weight: 300;
  font-size: 14px;
`;
const BoxBottomValue = styled.h2`
  font-family: "Poppins";
  font-weight: 500;
  font-size: 14px;
`;
