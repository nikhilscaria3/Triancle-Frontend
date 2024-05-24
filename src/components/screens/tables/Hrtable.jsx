import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { THEME_COLORS as themes } from "../../../ThemeConfig";
import styled from "styled-components";
import dots from "../../../assets/icons/3dots.svg";
import profile1 from "../../../assets/icons/profile1.svg";
import profile2 from "../../../assets/icons/profile2.svg";
import SearchBar from "../../includes/SearchBar";
const Hrtable = () => {
  const tableValues = [
    {
      icon: profile1,
      name: "gogul",
      email: "  gogul47@gmail.com",
      phno: "9865326598",
      job: "Site Supervisor",
      addDate: "02/15/24",
      idNo: 8965,
    },
    {
      icon: profile2,
      name: "gogul",
      email: "  gogul47@gmail.com",
      phno: "9865326598",
      job: "Site Supervisor",
      addDate: "02/15/24",
      idNo: 8965,
    },
  ];
  return (
    <div>
      <Head>
        <Left>Employee Details</Left>
        <Right>
          <SearchBar placeholder="Search name and id number" />
        </Right>
      </Head>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Ph no</Th>
            <Th>Job Role</Th>
            <Th>Add on date</Th>
            <Th>ID number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableValues.map((item, index) => (
            <Tr key={index}>
              <Td className="user">
                <Icon src={item.icon} alt={item.name} />

                {item.name}
              </Td>
              <Td>{item.email}</Td>
              <Td>{item.phno}</Td>
              <Td>{item.job}</Td>
              <Td>{item.addDate}</Td>
              <Td>{item.idNo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Hrtable;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
  background-color: ${themes.table_1};
  padding: 20px;
  border-radius: 10px 10px 0 0;
`;
const Left = styled.p``;
const Right = styled.div``;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0 10px;
  width: 98%;
  margin: 0 auto;
  border-radius: 0 0 10px 10px;
`;
const Thead = styled.thead`
  background-color: ${themes.table_1};
  font-weight: 500;
`;
const Icon = styled.img`
  height: 32px;
  width: 32px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${themes.table_1};
  }
`;
const Th = styled.th`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid ${themes.border_3};
`;
const Tbody = styled.tbody``;
const Td = styled.td`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  font-weight: 300;
  text-align: center;
  vertical-align: middle;
  &.user {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
