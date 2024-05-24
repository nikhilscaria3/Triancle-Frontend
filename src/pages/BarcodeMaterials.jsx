import React from "react";
import { THEME_COLORS as themes } from "../ThemeConfig";
import styled from "styled-components";

const BarcodeMaterials = () => {
  return (
    <div>
      {" "}
      <Container>
        <Heading>Barcode</Heading>
        <Top>
        </Top>
        <Mid></Mid>
        <Table></Table>
      </Container>
    </div>
  );
};

export default BarcodeMaterials;
const Container = styled.div`
  margin: 20px;
`;

const Heading = styled.div`
  padding: 20px 0;
  font-weight: 400;
  font-size: 30px;
`;

const Top = styled.div``;

const Mid = styled.div``;
const Table = styled.table``;
