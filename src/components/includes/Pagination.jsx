import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import left from "../../assets/icons/left.svg";
import right from "../../assets/icons/right.svg";
const Pagination = () => {
  return (
    <div>
      <PaginationSection>
        <Btn>
          <Icon src={left} alt="left" />
        </Btn>
        <Btn>1</Btn>
        <Btn>2</Btn>
        <Btn>
          {" "}
          <Icon src={right} alt="right" />
        </Btn>
      </PaginationSection>
    </div>
  );
};

export default Pagination;
const PaginationSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Btn = styled.button`
  height: 30px;
  width: 30px;
  background-color: ${themes.text_2};
  margin: 10px 5px;
`;
const Icon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: inline-block;
`;
