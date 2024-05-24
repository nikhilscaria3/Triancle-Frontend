import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { THEME_COLORS as themes } from "../../../ThemeConfig";
import styled from "styled-components";
import dots from "../../../assets/icons/3dots.svg";
import profile1 from "../../../assets/icons/profile1.svg";
import profile2 from "../../../assets/icons/profile2.svg";
import SearchBar from "../../includes/SearchBar";

const UserCurrProjTable = ({currentproject}) => {
  console.log(currentproject);
  const tableValues = [
    {
      sitename: "LP Constructions",
      job: "Site Supervisor",
      addDate: "02/15/24",
      attendance: 60,
    },
    {
      sitename: "Nila Constructions",
      job: "Project Manager",
      addDate: "03/15/24",
      attendance: 80,
    },
  ];
  return (
    <div>
      <Head>
        <Left>Current Working Projects</Left>
      </Head>
      <Table>
        <Thead>
          <Tr>
            <Th>Site Name</Th>
            <Th>Job Role</Th>
            <Th>Project Joining Date</Th>
            <Th>Attendance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentproject.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.jobRole}</Td>
              <Td>{item.startDate}</Td>
              <Td>
                <ProgressBar
                  completed={item.attendance}
                  height="5px"
                  customLabel=" "
                />
                {item.attendance}%
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default UserCurrProjTable;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto;
  background-color: ${themes.background_1};
  padding: 20px 0;
  border-radius: 10px 10px 0 0;
`;
const Left = styled.p``;
const Right = styled.div``;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0 10px;
  width: 75%;
  margin: 0 auto;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${themes.border_3};
  border-top: 0;
`;
const Thead = styled.thead`
  background-color: ${themes.table_2};
  font-weight: 500;
`;
const Icon = styled.img`
  height: 32px;
  width: 32px;
`;

const Tr = styled.tr``;
const Th = styled.th`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  border-right: 1px solid ${themes.border_3};
`;
const Tbody = styled.tbody`
  background-color: ${themes.table_1};
`;
const Td = styled.td`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  font-weight: 300;
  text-align: center; /* Horizontal alignment */
  vertical-align: middle; /* Vertical alignment */
  border-right: 1px solid ${themes.border_3};

  &.user {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
