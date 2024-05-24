import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import ongoing from "../../assets/icons/on-going-projects.svg";
import completed from "../../assets/icons/completed-projects.svg";
import halted from "../../assets/icons/halted-projects.svg";
import upcoming from "../../assets/icons/upcoming-projects.svg"

const ProjectBoxes = ({ countofproject }) => {
  const boxContents = [
    {
      icon: ongoing,
      alt: "Ongoing projects",
      head: "On Going Projects",
      value: countofproject ? countofproject["ongoingCount"] || 0 : 0,
      color: themes.ongoing,
    },
    {
      icon: completed,
      alt: "Completed projects",
      head: "Completed Projects",
      value: countofproject ? countofproject["completedCount"] || 0 : 0,
      color: themes.completed,
    },
    {
      icon: halted,
      alt: "Halted projects",
      head: "Halted Projects",
      value: countofproject ? countofproject["haltedCount"] || 0 : 0,
      color: themes.halted,
    },
    {
      icon: upcoming,
      alt: "Upcoming projects",
      head: "Upcoming Projects",
      value: countofproject ? countofproject["upcomingCount"] || 0 : 0,
      color: themes.upcoming,
    },
  ];

  return (
    <div>
      <MainContainer>
        {boxContents &&
          boxContents.map((item, index) => {
            return (
              <SubContainer key={index}>
                <Left>
                  <IconContainer style={{ background: item.color }}>
                    <Icon src={item.icon} alt={item.alt} />
                  </IconContainer>
                </Left>
                <Right>
                  <RightHead>{item.head}</RightHead>
                  <RightValue>{item.value}</RightValue>
                </Right>
              </SubContainer>
            );
          })}
      </MainContainer>
    </div>
  );
};

export default ProjectBoxes;


const MainContainer = styled.div`
  width: 98%;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
const SubContainer = styled.div`
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
