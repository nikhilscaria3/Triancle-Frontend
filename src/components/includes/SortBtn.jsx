import React, { useState } from "react";
import styled from "styled-components";
import sort from "../../assets/icons/sort.svg";
import config from "../../utils/config";

const SortBtn = ({ onFilter }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedType, setSelectedType] = useState(""); // State to store selected type

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onFilter(option); // Pass the selected option to the filter function
    toggleOptions(); // Close the options container
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    onFilter(type); // Pass the selected type to the filter function
  };

  return (
    <div>
      <SortContainer onClick={toggleOptions}>
        <Icon src={sort} alt="sort" />
        {showOptions && (
          <OptionsContainer>
            <Option onClick={() => handleOptionClick("Name A-Z")}>Name A-Z</Option>
            {/* <Option onClick={() => handleOptionClick("Amount Low to High")}>Amount Low to High</Option>
            <Option>
              <Select value={selectedType} onChange={handleTypeChange}>
                <Option value="">Type</Option>
                {config.settings.availableTypes &&
                  config.settings.availableTypes.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
              </Select>
              
            </Option>
            <Option onClick={() => handleOptionClick("Date")}>Date</Option>
            <Option onClick={() => handleOptionClick("Overdue Project")}>Overdue Project</Option> */}
          </OptionsContainer>
        )}
      </SortContainer>
    </div>
  );
};

export default SortBtn;

const SortContainer = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const Icon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 40px; /* Adjust as needed */
  right: 0;
  width: 150px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 999; /* Ensure it's above other content */
  text-align: center;
`;

const Option = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid black;
  &:last-child {
    border-bottom: 0;
  }
`;

const Select = styled.select`
  padding: 5px;
`;
