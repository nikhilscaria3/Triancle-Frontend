import React, { useState, useEffect } from "react";
import ExportBtn from "../components/includes/ExportBtn";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { THEME_COLORS as themes } from "../ThemeConfig";
import SearchBar from "../components/includes/SearchBar";
import SelectTags from "../components/includes/SelectTags";
import SortBtn from "../components/includes/SortBtn";
import CreateBtn from "../components/includes/CreateBtn";
import Pagination from "../components/includes/Pagination";
import dots from "../assets/icons/3dots.svg";
import { connect } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../actions/UserActions'; // Import action creators
import CreateUserForm from "../components/screens/createProject/CreateUserForm";
import { showNotification } from "../utils/toastmessage";
import { ToastContainer } from "react-toastify";
import { axiosInstance } from "../utils/baseurl";
import CreateReportForm from "../components/screens/createProject/CreateReportForm";

const Reports = () => {
  const [openCreateReport, setOpenCreateReport] = useState(false);
  const [Report, setReport] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);


  
  const handleSearch = (e) => {
    fetchUsers(e.target.value)
  };


  const handleFilter = (option) => {
    // Call getInvoices with the selected sorting option
    if (option === "Name A-Z") {
      fetchUsers('', "name", "ASC"); // Pass an empty string for searchTerm
    } else if (option === "Date") {
      fetchUsers('', "date", "ASC"); // Pass an empty string for searchTerm
    }
  };

  const fetchReport = async () => {
    try {
      const response = await axiosInstance.get("/report/getreport");
      setReport(response.data.reportdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.setAttribute('download', 'image.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendReportByEmail({ recipient, subject, message });
      alert('Report sent successfully!');
    } catch (error) {
      console.error('Error sending report via email:', error);
      alert('An error occurred while sending the report. Please try again later.');
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReport([...Report, file]);
    }
  };

  const handleViewReport = (Report) => {
    setSelectedReport(Report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
    setShowModal(false);
  };

  const toggleCreateReport = () => {
    setOpenCreateReport(true);
    setReport(true)
  };

  const closeCreateReport = () => {
    setOpenCreateReport(false);
  };

  
  const optionValue = ["2020", "2021", "2022", "2023", "2024"];



  return (
    <div>
      <ToastContainer />
      <Container>
        <MainContainer>
          <Btn onClick={toggleCreateReport}>
            <CreateBtn text="Create New Report" />
          </Btn>
          {/* <RightActions>
            <SelectTags options={optionValue} />
            <SearchBar placeholder={"Search name or email"} onChange={handleSearch} />
            <SortBtn onFilter={handleFilter} />
          </RightActions> */}
          {openCreateReport && (
            <ModalOverlay>
              <CreateReportForm
                onClose={closeCreateReport}
                // createReportData={handleCreateReport}
                // updateReportData={handleUpdateReport}
                // newReport={newReport}
                // ReportData={editReportData}
              />
            </ModalOverlay>
          )}{" "}
        </MainContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Recipient Email</Th>
              <Th>Subject</Th>
              <Th>Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Reports && Reports.length > 0 ? (
              Reports.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.recipientemail}</Td>
                  <Td>{item.subject}</Td>
                  <Td>{item.message}</Td>
                  <Td>
                    <Btn style={{ color: "Blue" }} onClick={() => handleEditReport(item)}>Edit</Btn>
                    <Btn style={{ color: "Red" }} onClick={() => handleDeleteClick(item.id)} >Delete</Btn>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="10">No Reports available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        <Pagination />
      </Container>
    </div>
  );
};

export default Reports;


const Container = styled.div`
  width: 98%;
  margin: 0 auto;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  margin: 0 auto;
`;

const Dot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
`;

const GreenDot = styled(Dot)`
  background-color: green;
`;

const RedDot = styled(Dot)`
  background-color: red;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Btn = styled.div``;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(113, 113, 113, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  z-index: 999;
`;

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



const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #f0f2f5;
`;
