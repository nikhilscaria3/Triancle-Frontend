import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../ThemeConfig";
import HrBoxes from "../components/includes/HrBoxes";
import Hrtable from "../components/screens/tables/Hrtable";
import Pagination from "../components/includes/Pagination";
const HR = () => {
  return (
    <div>
      <MainContainer>
        <Left>
          <HrBoxes />
          <Hrtable />
          <Pagination />
        </Left>
        <Right>
          <Box>
            <BoxHead>Recruitment</BoxHead>
            <BoxPara>
              <List>
                <Items>Jobs</Items>
                <Items>Candidates</Items>
                <Items>Company</Items>
                <Items>Employees</Items>
                <Items>Leave</Items>
                <Items>Salary</Items>
                <Items>Report</Items>
              </List>
            </BoxPara>
          </Box>
          <Box>
            <BoxHead>Recruitment</BoxHead>
            <BoxPara>
              <List>
                <Items>Jobs</Items>
                <Items>Candidates</Items>
              </List>
            </BoxPara>
          </Box>
        </Right>
      </MainContainer>
    </div>
  );
};

export default HR;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.5fr;
  width: 98%;
  margin: 20px auto;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Box = styled.div``;
const BoxHead = styled.div`
  background-color: ${themes.background_5};
  padding: 15px;
  border-radius: 10px 10px 0px 0px;
`;
const BoxPara = styled.div`
  border-radius: 0px 0px 10px 10px;
  background-color: ${themes.table_1};
  padding: 10px 15px;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Items = styled.li`
  padding: 15px 0;
`;
