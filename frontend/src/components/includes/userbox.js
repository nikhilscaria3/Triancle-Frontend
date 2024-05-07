import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import ongoing from "../../assets/icons/on-going-projects.svg";
import completed from "../../assets/icons/completed-projects.svg";
import halted from "../../assets/icons/halted-projects.svg";
import upcoming from "../../assets/icons/upcoming-projects.svg";

const UserBoxes = ({ count }) => {
  const boxContents = [
    {
      icon: ongoing,
      alt: "Standard User",
      head: "Active",
      colorCounts: count ? count.find((item) => item.status === "active") || { count: 0 } : { count: 0 },
      color: themes.ongoing,
    },
    {
      icon: halted,
      alt: "Administrator",
      head: "Inactive",
      colorCounts: count ? count.find((item) => item.status === "inactive") || { count: 0 } : { count: 0 },
      color: themes.halted,
    },
    {
      icon: completed,
      alt: "Active Users",
      head: "Admin",
      colorCounts: count ? count.find((item) => item.role === "admin") || { count: 0 } : { count: 0 },
      color: themes.completed,
    },
    {
      icon: upcoming,
      alt: "Inactive Users",
      head: "User",
      colorCounts: count ? count.find((item) => item.role === "user") || { count: 0 } : { count: 0 },
      color: themes.upcoming,
    },
  ];


  return (
    <MainContainer>
      {boxContents.map((item, index) => (
        <BoxContainer key={index}>
          <Left>
            <IconContainer style={{ background: item.color }}>
              <Icon src={item.icon} alt={item.alt} />
            </IconContainer>
          </Left>
          <Right>
            <RightHead>{item.head}</RightHead>
            {item.colorCounts ? (
              <RightValue>{item.colorCounts.count}</RightValue>
            ) : (
              <RightValue>No data available</RightValue>
            )}
          </Right>
        </BoxContainer>
      ))}
    </MainContainer>
  );
};

export default UserBoxes;


const MainContainer = styled.div`
  width: 98%;
  margin: 2px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
const BoxContainer = styled.div`
background-color: #fff;
width: auto;
display: flex;
align-items: flex-end;
gap: 20px;
padding: 20px;
border-radius: 20px;
`;
const Left = styled.div``;
const IconContainer = styled.div`
  height: 76px;
  width: 76px;
  background-color: aqua;
  padding: 20px;
  border-radius: 18px;
`;
const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Right = styled.div``;
const RightHead = styled.h3`
  padding-bottom: 10px;
  border-bottom: 2px solid ${themes.text_8};
  font-weight: 400;
  font-size: 16px;
  color: ${themes.text_8};
`;
const RightValue = styled.p`
  font-weight: 600;
  font-size: 35px;
  color: ${themes.text_8};
`;
