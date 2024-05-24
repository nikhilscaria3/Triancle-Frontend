import React from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";
const FinanceBoxes = () => {
  const boxValues = [
    { bg: themes.current_ratio, head: "Current Raito", value: "0.0" },
    { bg: themes.working_capital, head: "Working Capital", value: "-1.80K" },
    { bg: themes.gross_margin, head: "Gross Margin", value: "32.6K" },
    { bg: themes.EBITDA, head: "EBITDA", value: "32.6K" },
    { bg: themes.primary_btn, head: "Income", value: "25.5" },
    { bg: themes.primary_btn, head: "Expense", value: "0.60" },
    { bg: themes.primary_btn, head: "Expending", value: "0.52" },
    { bg: themes.primary_btn, head: "Total", value: "2.58" },
  ];
  return (
    <div>
      <MainContainer>
        {boxValues &&
          boxValues.map((item, index) => {
            return (
              <SingleBoxes style={{ background: item.bg }}>
                <Head bg={item.bg}>{item.head}</Head>
                <Value>
                  <Amount bg={item.bg}>{item.value}</Amount>
                </Value>
              </SingleBoxes>
            );
          })}
      </MainContainer>
    </div>
  );
};

export default FinanceBoxes;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const SingleBoxes = styled.div`
  border: 0.4px solid ${themes.border_5};
  border-radius: 10px;
  padding: 10px 10px 0 10px;
`;
const Head = styled.div`
  font-size: 22px;
  font-weight: 300;
  color: ${(props) =>
    props.bg !== themes.primary_btn ? themes.text_11 : themes.background_3};
`;
const Value = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
`;
const Amount = styled.div`
  font-size: 80px;
  font-weight: 300;
  color: ${(props) =>
    props.bg !== themes.primary_btn ? themes.text_1 : themes.background_3};
`;
