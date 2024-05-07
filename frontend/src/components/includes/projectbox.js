import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import ongoing from "../../assets/icons/on-going-projects.svg";
import completed from "../../assets/icons/completed-projects.svg";
import halted from "../../assets/icons/halted-projects.svg";
import upcoming from "../../assets/icons/upcoming-projects.svg";

const ProjectBoxes = ({ count }) => {
    const boxContents = [
        {
            icon: ongoing,
            alt: "Ongoing projects",
            head: "Active",
            value: 254,
            colorCounts: count ? count.find((item) => item.status === "Active") || { count: 0 } : { count: 0 },
            color: themes.ongoing,
        },
        {
            icon: completed,
            alt: "Completed projects",
            head: "Completed",
            value: 35,
            colorCounts: count ? count.find((item) => item.status === "Completed") || { count: 0 } : { count: 0 },
            color: themes.completed,
        },
        {
            icon: upcoming,
            alt: "Halted projects",
            head: "Inactive",
            value: 20,
            colorCounts: count ? count.find((item) => item.status === "Inactive") || { count: 0 } : { count: 0 },
            color: themes.upcoming,
        },
        {
            icon: halted,
            alt: "Upcoming projects",
            head: "Hold",
            value: 44,
            colorCounts: count ? count.find((item) => item.status === "Hold") || { count: 0 } : { count: 0 },
            color: themes.halted
        },
    ];


    return (
        <div>
            <MainContainer>
                {boxContents.map((item, index) => {
                    return (
                        <SubContainer key={index}>
                            <Left>
                                <IconContainer style={{ background: item.color }}>
                                    <Icon src={item.icon} alt={item.alt} />
                                </IconContainer>
                            </Left>
                            <Right>
                                <RightHead>{item.head}</RightHead>
                                {item.colorCounts ? (
                                    <>

                                        <RightValue>{item.colorCounts.count}</RightValue>

                                    </>
                                ) : (
                                    <RightValue>No data available</RightValue>
                                )}
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
  margin:auto;
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
