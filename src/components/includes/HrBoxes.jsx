import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import badge from "../../assets/icons/badge.svg";
import engineering from "../../assets/icons/engineering.svg";
import sticky from "../../assets/icons/sticky.svg";
import Hrtable from "../screens/tables/Hrtable";
const HrBoxes = () => {
  const boxes = [
    {
      id: 1,
      icon: badge,
      alt: "badge",
      head: "50",
      para: "lroem lorem lorem",
      bg: themes.badge,
    },
    {
      id: 2,
      icon: engineering,
      alt: "engineering",
      head: "50",
      para: "lroem lorem lorem",
      bg: themes.engineering,
    },
    {
      id: 3,
      icon: sticky,
      alt: "sticky",
      head: "50",
      para: "lroem lorem lorem",
      bg: themes.sticky,
    },
  ];
  return (
    <div>
      <MainContainer>
        {boxes &&
          boxes.map((box, index) => {
            return (
              <SingleBoxes>
                <Left style={{ background: box.bg }}>
                  <Icon src={box.icon} alt={box.alt} />
                </Left>
                <Right>
                  <Head>{box.head}</Head>
                  <Para>{box.para}</Para>
                </Right>
              </SingleBoxes>
            );
          })}
      </MainContainer>
    </div>
  );
};

export default HrBoxes;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
  gap: 15px;
`;
const SingleBoxes = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 4px 4px 4px 0 #0000000d;
  padding: 30px;
  border-radius: 10px;
  background-color: ${themes.background_3};
`;
const Left = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 10px;
`;
const Right = styled.div``;
const Icon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: inline-block;
  cursor: pointer;
  padding: 10px;
`;
const Head = styled.p`
  border-bottom: 1px solid ${themes.border_2};
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
`;
const Para = styled.p`
  font-size: 20px;
  font-weight: 300;
  line-height: 20px;
  color: #888888;
  padding-top: 10px;
`;
