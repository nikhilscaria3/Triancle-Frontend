import React from "react";
import styled from "styled-components";
import accordion from "../../assets/icons/down.svg";

const SelectTags = ({ options }) => {
  return (
    <div>
      <SelectOption>
        <YearFilter>
          {options &&
            options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
        </YearFilter>
        <Dropdown className="inYear">
          <Accordion src={accordion} alt="down" />
        </Dropdown>
      </SelectOption>
    </div>
  );
};

export default SelectTags;
const YearFilter = styled.select`
  height: 100%;
  padding: 10px;
  padding-right: 40px;
  font-size: 14px;
  background-color: #ffff;
  border-radius: 9px;
  border: 0.8px solid #74747454;
  color: #888888;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none; /* Webkit browsers like Chrome and Safari */
  -moz-appearance: none; /* Firefox */
  appearance: none;
  background-image: none; /* Remove default arrow */
`;
const SelectOption = styled.div`
  position: relative;
  z-index: 100;
`;
const Dropdown = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 300;
  cursor: pointer;

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
