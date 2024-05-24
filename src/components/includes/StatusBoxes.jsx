import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import "../../assets/css/fontStyles.css";
//image imports
import projects from "../../assets/icons/projects.svg";
import attendance from "../../assets/icons/attendance-color.svg";
import requests from "../../assets/icons/request-color.svg";
import employees from "../../assets/icons/employees-color.svg";
import clients from "../../assets/icons/clients-color.svg";
const StatusBoxes = () => {
  const boxContents = [
    {
      icon: projects,
      title: "Projects",
      alt: "Projects",
      titleValue: 360,
      ongoing: 348,
      completed: 342,
      pending: 4,
      color: themes.projects,
      bg: "#E1F6FF",
    },
    {
      icon: attendance,
      title: "Attendances",
      alt: "Attendances",
      titleValue: 2500,
      ongoing: 348,
      completed: 342,
      pending: 4,
      color: themes.attendances,
      bg: "#DAFFF4",
    },
    {
      icon: requests,
      title: "Requests",
      alt: "Requests",
      titleValue: 125,
      ongoing: 348,
      completed: 342,
      pending: 4,
      color: themes.requests,
      bg: "#FFEBEB",
    },
    {
      icon: employees,
      title: "Employees",
      alt: "Employees",
      titleValue: 6582,
      ongoing: 348,
      completed: 342,
      pending: 4,
      color: themes.employees,
      bg: "#F2EEFF",
    },
    {
      icon: clients,
      title: "Clients",
      alt: "Clients",
      titleValue: 5698,
      ongoing: 348,
      completed: 342,
      pending: 4,
      color: themes.clients,
      bg: "#FFFCDC",
    },
  ];
  return (
    <>
      <MainContainer>
        {boxContents &&
          boxContents.map((item, index) => {
            return (
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
                  <BoxBottomContent>
                    <BoxBottomSubHead>Ongoing</BoxBottomSubHead>
                    <BoxBottomValue>{item.ongoing}</BoxBottomValue>
                  </BoxBottomContent>
                  <BoxBottomContent>
                    <BoxBottomSubHead>Completed</BoxBottomSubHead>
                    <BoxBottomValue>{item.completed}</BoxBottomValue>
                  </BoxBottomContent>
                  <BoxBottomContent>
                    <BoxBottomSubHead>Pending</BoxBottomSubHead>
                    <BoxBottomValue>{item.pending}</BoxBottomValue>
                  </BoxBottomContent>
                </BoxBottom>
              </BoxContainer>
            );
          })}
      </MainContainer>
    </>
  );
};

export default StatusBoxes;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
