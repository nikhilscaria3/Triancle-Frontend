//for testing purposes

import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { THEME_COLORS as themes } from "../../ThemeConfig";
import styled from "styled-components";
import dots from "../../assets/icons/3dots.svg";

const Tables = ({ tableContents }) => {
  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Name</Th>
            <Th>Project ID</Th>
            <Th>Location</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>% Completed</Th>
            <Th>Project Head</Th>
            <Th>Settings</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableContents.map((item) => (
            <Tr key={item.id}>
              <Td>{item.type}</Td>
              <Td>{item.name}</Td>
              <Td>{item.projectID}</Td>
              <Td>{item.location}</Td>
              <Td>{item.startDate}</Td>
              <Td>{item.endDate}</Td>
              <Td>
                <ProgressBar
                  completed={item.percentageCompleted}
                  customLabel=" "
                  height="5px"
                />
              </Td>
              <Td>{item.projectHead}</Td>
              <Td>
                <Btn>
                  <Img src={dots} alt="More settings" />
                </Btn>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Tables;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0 10px;
  width: 98%;
  margin: 20px auto;
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
`;

const Img = styled.img``;
