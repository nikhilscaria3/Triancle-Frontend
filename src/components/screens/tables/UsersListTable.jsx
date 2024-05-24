import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { THEME_COLORS as themes } from "../../../ThemeConfig";
import styled from "styled-components";
import dots from "../../../assets/icons/3dots.svg";
import profile1 from "../../../assets/icons/profile1.svg";
import profile2 from "../../../assets/icons/profile2.svg";
import Pagination from "../../includes/Pagination";
const UsersListTable = () => {
  const tableValues = [
    {
      icon: profile1,
      name: "gogul",
      email: "  gogul47@gmail.com",
      job: "Site Supervisor",
      access: "Project Ad.",
      status: "Online",
      phno: "9865326598",
      addDate: "02/15/24",
      idNo: 8965,
      blood: "B+",
    },
    {
      icon: profile2,
      name: "gogul",
      email: "  gogul47@gmail.com",
      job: "Site Supervisor",
      access: "Project Ad.",
      status: "offline",
      phno: "9865326598",
      addDate: "02/15/24",
      idNo: 8965,
      blood: "B+",
    },
    {
      icon: profile1,
      name: "gogul",
      email: "  gogul47@gmail.com",
      job: "Site Supervisor",
      access: "Project Ad.",
      status: "online",
      phno: "9865326598",
      addDate: "02/15/24",
      idNo: 8965,
      blood: "B+",
    },
    {
      icon: profile2,
      name: "gogul",
      email: "  gogul47@gmail.com",
      job: "Site Supervisor",
      access: "Project Ad.",
      status: "offline",
      phno: "9865326598",
      addDate: "02/15/24",
      idNo: 8965,
      blood: "B+",
    },
  ];
  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Job Role</Th>
            <Th>Access Level</Th>
            <Th>Phone No</Th>
            <Th>Status</Th>
            <Th>Add On Date</Th>
            <Th>ID Number</Th>
            <Th>Blood Group</Th>
            <Th>Change me</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableValues.map((item) => (
            <Tr key={item.id}>
              <Td className="user">
                <Icon src={item.icon} alt={item.name} />

                {item.name}
              </Td>
              <Td>{item.email}</Td>
              <Td>{item.job}</Td>
              <Td>{item.access}</Td>
              <Td>{item.phno}</Td>
              <Td>
                {item.status === "online" || item.status === "Online"
                  ? "🟢"
                  : "🔴"}
              </Td>
              <Td>{item.addDate}</Td>
              <Td>{item.idNo}</Td>
              <Td>{item.blood}</Td>{" "}
              <Td>
                <Btn>
                  <Img src={dots} alt="More settings" />
                </Btn>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination />
    </div>
  );
};

export default UsersListTable;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0 10px;
  width: 98%;
  margin: 20px auto;
`;

const Icon = styled.img`
  height: 32px;
  width: 32px;
`;
const Thead = styled.thead`
  background-color: ${themes.table_1};
  font-weight: 500;
`;
const Btn = styled.div``;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${themes.table_1};
  }
`;
const Th = styled.th`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
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

const Img = styled.img``;
