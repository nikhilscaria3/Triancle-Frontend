import React, { useState, useEffect } from "react";
import { THEME_COLORS as themes } from "../ThemeConfig";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ItemMaster from "./ItemMaster";
import ApprovedInventory from "./ApprovedInventory";
import StockMovement from "./StockMovement";
import BarcodeMaterials from "./BarcodeMaterials";

const Materials = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const topBtns = [
    {
      name: "Item Master",
      section: <ItemMaster />,
    },
    {
      name: "Inventory Request",
      section: <ApprovedInventory />,
    },
    {
      name: "Stock Movement",
      section: <StockMovement />,
    },
    {
      name: "Barcode",
      section: <BarcodeMaterials />,
    },
  ];
  const toggleBtn = (index) => {
    setActiveBtn(index);
  };

  return (
    <div>
      <Container>
        <Top>
          {topBtns &&
            topBtns.map((btn, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => toggleBtn(index)}
                  active={activeBtn === index}
                >
                  {btn.name}
                </Button>
              );
            })}
        </Top>
        <Mid>{activeBtn !== -1 && topBtns[activeBtn].section}</Mid>
        <Table></Table>
      </Container>
    </div>
  );
};


export default Materials;


const Container = styled.div`
  margin: 20px;
`;
const Top = styled.div``;
const Button = styled.button`
  background-color: ${(props) =>
    props.active ? `${themes.primary_btn}` : `${themes.inActive_btn}`};
  color: #fff;
  margin: 0 20px;
  padding: 10px;
  border-radius: 5px;
`;

const Mid = styled.div``;
const Table = styled.table``;
