import React from "react";
import styled from "styled-components";
import { THEME_COLORS } from "../../ThemeConfig";
import searchicon from "../../assets/icons/search-icon.svg";

const SearchBar = ({ placeholder, onChange }) => {
  return (
    <div>
      <SearchContainer>
        <SearchIcon src={searchicon} alt="Search" />
        <Input type="text" placeholder={placeholder} onChange={onChange} />
      </SearchContainer>
    </div>
  );
};

export default SearchBar;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  object-fit: cover;
  margin-right: 10px;
  position: absolute;
  left: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 8px 40px;
  width: 100%;
  border-radius: 8px;
  padding-left: 35px;
  font-size: 14px;
  transition: all 0.4s;
  outline: 0;
  color: #000;
  background: #fff;
  cursor: pointer;

  border: 1px solid rgba(116, 116, 116, 0.4);
  &:focus-within {
    border: 1px solid #000;
    outline: none;
  }
  &::placeholder {
    color: rgba(116, 116, 116, 0.4);
    font-size: 15px;
  }
`;
