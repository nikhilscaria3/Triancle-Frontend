import React, { useState } from "react";
import styled from "styled-components";

//image imports
import image from "../assets/icons/image.svg";
import finance from "../assets/icons/finance.svg";
import square from "../assets/icons/edit_square.svg";
import calendar from "../assets/icons/calendar.svg";
import weather from "../assets/icons/partly1.svg";
import groups from "../assets/icons/groups.svg";
import task from "../assets/icons/task.svg";
import StatusBoxes from "../components/includes/StatusBoxes";
import SelectTags from "../components/includes/SelectTags";
const topButtons = [
  {
    icon: image,
    alt: "gallery",
  },
  {
    icon: finance,
    alt: "wallet",
  },
  {
    icon: calendar,
    alt: "calendar",
  },
  {
    icon: weather,
    alt: "weather",
  },
  {
    icon: square,
    alt: "square",
  },
  {
    icon: task,
    alt: "task",
  },
  {
    icon: groups,
    alt: "people",
  },
];
const Dashboard = () => {
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const optionValues1 = ["dummy1", "dummy2", "dummy3", "dummy4"];
  const optionValues2 = ["cdummy1", "cdummy2", "cdummy3", "cdummy4"];
  return (
    <div style={{ color: " black " }}>
      <DashboardContainer>
        <Top>
          <TopFilter>
            <SelectTags options={optionValues1} />
            <SelectTags options={optionValues2} />
          </TopFilter>
          <TopBtns>
            {topButtons.map((item, index) => {
              return (
                <TopBtnContainer
                  className={activeButton === index ? "active" : ""}
                  onClick={() => handleButtonClick(index)}
                  key={index}
                >
                  <TopBtn src={item.icon} alt={item.alt} />
                </TopBtnContainer>
              );
            })}
          </TopBtns>
        </Top>
        <Mid>
          <StatusBoxes />
        </Mid>

        <Charts></Charts>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  height: 88vh;
  width: 98%;
  margin: 8px auto;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
const Mid = styled.div``;
const Charts = styled.div``;
const TopFilter = styled.div`
  display: flex;
  gap: 20px;
  width: 50%;
`;
const TopBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
`;
const SelectOption = styled.div`
  position: relative;
  z-index: 100;
`;
const Overall = styled.select`
  min-width: 300px;
  height: 100%;
  padding: 8px 15px;
  font-size: 14px;
  width: 60%;
  border-radius: 9px;
  border: 0.8px solid #74747454;
  outline: none;
  color: #888888;
  -webkit-appearance: none; /* Webkit browsers like Chrome and Safari */
  -moz-appearance: none; /* Firefox */
  appearance: none;
  background-image: none; /* Remove default arrow */

  background-color: #fff;
`;
const Dropdown = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 300;

  &.inYear {
    position: absolute;
    right: 5px;
    top: 50%;
  }
`;
const Accordion = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;
const YearFilter = styled.select`
  height: 100%;
  width: 100px;
  padding: 0 6px 0 10px;
  font-size: 14px;
  background-color: #ffff;
  border-radius: 9px;
  border: 0.8px solid #74747454;
  color: #888888;
  outline: none;
  -webkit-appearance: none; /* Webkit browsers like Chrome and Safari */
  -moz-appearance: none; /* Firefox */
  appearance: none;
  background-image: none; /* Remove default arrow */
`;
const TopBtnContainer = styled.div`
  height: 49px;
  width: 49px;
  border-radius: 15px;
  padding: 12px;
  //width: 700px;
  &.active {
    background-color: #0057ff;
  }
`;
const TopBtn = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;

  ${TopBtnContainer}.active & {
    filter: invert(80%) brightness(240%);
  }
`;
