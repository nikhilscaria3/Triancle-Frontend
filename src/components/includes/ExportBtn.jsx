import React, { useState } from "react";
import styled from "styled-components";
import exportIcon from "../../assets/icons/export.svg";
import { THEME_COLORS as theme } from "../../ThemeConfig";

const ExportBtn = ({ ExportData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleExport = (format) => {
    ExportData(format)
  };

  return (
    <ExportContainer>
      <ExportButton onClick={toggleDropdown}>
        <Icon src={exportIcon} alt="export" />
        <Export> Export</Export>
      </ExportButton>
      {isOpen && (
        <Dropdown>
          <DropdownItem onClick={() => handleExport("CSV")}>Excel</DropdownItem>
          <DropdownItem onClick={() => handleExport("PDF")}>PDF</DropdownItem>
        </Dropdown>
      )}
    </ExportContainer>
  );
};

export default ExportBtn;

const ExportContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ExportButton = styled.button`
  border: 1px solid ${theme.border_4};
  padding: 17px;
  width: 110px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
`;
const Export = styled.button`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
`;


const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${theme.border_4};
  border-top: none;
  border-radius: 0 0 5px 5px;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.hover_bg};
  }
`;
