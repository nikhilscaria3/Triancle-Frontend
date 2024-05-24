import React from "react";
import FinanceBoxes from "../components/includes/FinanceBoxes";
import styled from "styled-components";
const Finance = () => {
  return (
    <div>
      <MainContainer>
        <FinanceBoxes />
      </MainContainer>
    </div>
  );
};

export default Finance;
const MainContainer = styled.div`
  margin: auto;
  width: 98%;
`;
