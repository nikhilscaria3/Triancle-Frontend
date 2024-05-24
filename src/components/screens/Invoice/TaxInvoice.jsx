import React, { useState } from "react";
import styled from "styled-components";
import exportIcon from "../../../assets/icons/export.svg";
import { THEME_COLORS as theme } from "../../../ThemeConfig";
import QrCode from "../../includes/QrCode";
import ExportBtn from "../../includes/ExportBtn";
const TaxInvoice = () => {
  //for testing purpose only
  const [TID, setTID] = useState("empty");

  return (
    <>
      <MainContainer>
        <TopMainContainer>
          <MainHead>Tax Invoice</MainHead>
          <TopMainBtns>
            <Done>Done</Done>
            <ExportBtn />
          </TopMainBtns>
        </TopMainContainer>
        <InvoiceContainer>
          <MainHead>Tax Invoice</MainHead>
          <Top>
            <TopLeft>
              <Invoice>
                <Label>Invoice Number</Label>
                <Input placeholder="Enter Invoice Number" />
              </Invoice>
              <Date>
                <Label>Date</Label>
                <Input placeholder="Enter Date" />
              </Date>
              <Transaction>
                <Label>Transaction</Label>
                <Input
                  placeholder="Enter Transaction ID"
                  onChange={(e) => setTID(e.target.value)}
                />
              </Transaction>
            </TopLeft>
            <TopRight>
              <QrCode tid={TID} />
            </TopRight>
          </Top>

          <Mid>
            <MidTop>
              <NameAddress
                rows={10}
                cols={40}
                placeholder="Name and Address"
              ></NameAddress>
              <MidTopLeft>
                <GstBox>
                  <Label>GST/UIN</Label>
                  <Input placeholder="Enter GST/UIN" />
                </GstBox>
                <StateName>
                  <Label>State Name</Label>
                  <Input placeholder="Enter your State Name" />
                </StateName>
                <StateCode>
                  <Label>State Code</Label>
                  <Input placeholder="Enter your State Code" />
                </StateCode>
              </MidTopLeft>
            </MidTop>
            <MidTable>
              <MidTableHead>
                <TableRow>
                  <MidTableHeadLeft colSpan={1}>Sl No</MidTableHeadLeft>
                  <MidTableHeadLeft>Description of Goods</MidTableHeadLeft>
                  <MidTableHeadLeft>HSN/SAC</MidTableHeadLeft>
                  <MidTableHeadLeft>Quantity</MidTableHeadLeft>
                  <MidTableHeadLeft>Rate</MidTableHeadLeft>
                  <MidTableHeadLeft>Per</MidTableHeadLeft>
                  <MidTableHeadLeft>Disc %</MidTableHeadLeft>
                  <MidTableHeadLeft>Amount</MidTableHeadLeft>
                </TableRow>
              </MidTableHead>
              <MidTableBody>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Alias, velit odio sunt aperiam commodi corrupti deserunt
                    dolore, ea, in itaque reprehenderit? Hic quod esse, nam ab
                    laboriosam expedita fugiat veritatis.
                  </TableData>
                  <TableData>87923/4567</TableData>
                  <TableData>2</TableData>
                  <TableData>32</TableData>
                  <TableData>10</TableData>
                  <TableData>2</TableData>
                  <TableData>50</TableData>
                </TableRow>
                <TableRow>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                </TableRow>
                <TableRow>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                </TableRow>
                <TableRow>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                  <TableData>
                    <Input />
                  </TableData>
                </TableRow>
              </MidTableBody>
            </MidTable>
            <MidBottom>
              <TopLeft>
                <Invoice>
                  <Label>Total Amount</Label>
                  <Input placeholder="Enter Total amount" />
                </Invoice>
                <Date>
                  <Label>CGST</Label>
                  <Input placeholder="Enter CGST" />
                </Date>
                <Transaction>
                  <Label>SGST</Label>
                  <Input placeholder="Enter SGST" />
                </Transaction>
              </TopLeft>
            </MidBottom>
          </Mid>

          <Bottom>
            <BtmLeft>
              <Label>Total in Words</Label>
              <Input placeholder="Total in words" />
            </BtmLeft>
            <BtmRight>
              <Label>Total</Label>
              <Input placeholder="Total" />
            </BtmRight>
          </Bottom>
        </InvoiceContainer>
      </MainContainer>
    </>
  );
};

export default TaxInvoice;
const MainContainer = styled.div`
  background-color: ${theme.background_1};
  padding: 12px;
`;
const TopMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 99%;
`;
const TopMainBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Done = styled.button`
  background-color: #00e08f;
  color: #fff;
  padding: 10px 12px;
  border-radius: 5px;
`;
const InvoiceContainer = styled.div`
  background-color: #fff;
  padding: 12px;
  width: 80%;
  margin: 20px auto;
  border: 1px solid ${theme.border_3};
`;
const MainHead = styled.h1`
  font-family: "Poppins";
  font-weight: 600;
  font-size: 30px;
  color: #000000;
  text-align: center;
  padding: 20px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.border_3};
  gap: 10px;
`;
const TopLeft = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopRight = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
`;

const Invoice = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.h4`
  font-family: "Poppins";
  font-weight: 300;
  font-size: 14px;
  color: #000000;
`;
const Input = styled.input`
  font-family: "Poppins";
  padding: 2px 10px;
  width: 70%;
  border: 1px solid ${theme.border_1};

  &::placeholder {
    font-size: 14px;
  }
`;

const Date = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Mid = styled.div`
  margin-top: 30px;
`;
const MidTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;
`;
const MidBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;
const NameAddress = styled.textarea`
  width: 40%;
  padding: 10px;
  border: 1px solid ${theme.border_1};

  &::placeholder {
    font-size: 14px;
  }
`;
const MidTopLeft = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: normal;
  gap: 20px;
  padding: 30px;
  border: 1px solid ${theme.border_1};
`;
const GstBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StateName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StateCode = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MidTable = styled.table`
  margin: 40px auto;
  width: 80%;
  border-collapse: collapse;
  padding-bottom: 20px;
`;
const MidTableHead = styled.thead``;
const MidTableHeadLeft = styled.th`
  border: 1px solid ${theme.border_1};
  padding: 8px;
  font-weight: 400;
  font-size: 15px;
  color: ${theme.text_7};
`;
const MidTableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableData = styled.td`
  border: 1px solid ${theme.border_1};
  padding: 8px;
  font-size: 14px;
`;

const Bottom = styled.div`
  border-top: 1px solid ${theme.border_3};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BtmLeft = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 10px;
`;
const BtmRight = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
