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
import { fetchChecklist, exportChecklist } from '../actions/ChecklistActions'; // Import action creators
import { showNotification } from "../utils/toastmessage";
import { ToastContainer } from "react-toastify";
import { axiosInstance } from "../utils/baseurl";


const Checklist = ({ checklists, bufferdata, message, loading, error, fetchChecklist, exportChecklist }) => {
  const [openCreateChecklist, setOpenCreateChecklist] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [editChecklistData, setEditChecklistData] = useState(null);
  const [newChecklist, setnewChecklist] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storedID, setStoredID] = useState(null)
  const [ExportData, setExportData] = useState(null)
  const [pdfBuffer, setPdfBuffer] = useState(null); // State to store PDF buffer
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(checklists.totalPages);

  useEffect(() => {
    // Fetch Checklists when component mounts
    fetchChecklist(page, limit);
  }, [fetchChecklist]);

  console.log(checklists);


  const handleSearch = (e) => {
    fetchChecklist("", "", e.target.value)
  };

  const handleFilter = (option) => {
    // Call getInvoices with the selected sorting option
    if (option === "Name A-Z") {
      fetchChecklist('', "type", "ASC"); // Pass an empty string for searchTerm
    } else if (option === "Date") {
      fetchChecklist('', "date", "ASC"); // Pass an empty string for searchTerm
    }
  };


  const handleExportData = async (format) => {
    try {
      await exportChecklist(format)
      if (format === "PDF") {
        const blob = new Blob([bufferdata], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Checklist.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (format === "CSV") {
        const blob = new Blob([bufferdata], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Checklist.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      // Handle error, e.g., show an error message to the Checklist
    }
  };

  // const handleEditChecklist = (item) => {
  //   console.log("item", item);
  //   setEditChecklistData((prevData) => ({ ...prevData, ...item }));
  //   setOpenCreateChecklist(true);
  //   setnewChecklist(false)
  // };

  // const handleCreateChecklist = async (formData) => {
  //   try {
  //     await createChecklist(formData);
  //     showNotification({ type: "SUCCESS", message: message }); // Show success notification
  //     fetchChecklist(); // Refresh Checklist data
  //   } catch (error) {
  //     showNotification({ type: "ERROR", message: error }); // Show error notification
  //   }
  // };

  // const handleUpdateChecklist = async (formData) => {
  //   try {
  //     await updateChecklist(formData);
  //     fetchChecklist(); // Refresh Checklist data

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const handleDeleteClick = (ChecklistId) => {
  //   setStoredID(ChecklistId)
  //   setShowDeleteModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowDeleteModal(false);
  // };



  // const handleDeleteChecklist = async (storedID) => {
  //   try {
  //     await deleteChecklist(storedID); // Pass the storedID directly to your action
  //     setShowDeleteModal(false);
  //     fetchChecklist(); // Refresh Checklist data
  //   } catch (error) {

  //   }
  // };

  const toggleCreateChecklist = () => {
    setOpenCreateChecklist(true);
    setnewChecklist(true)
  };

  const closeCreateChecklist = () => {
    setOpenCreateChecklist(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green'; // Change this to the desired color value for Completed status
      case 'Pending':
        return 'red'; // Change this to the desired color value for Pending status
      case 'Progress':
        return 'blue'; // Change this to the desired color value for Progress status
      case 'Halted':
        return 'rose'; // Change this to the desired color value for Halted status
      default:
        return 'black'; // Default color for unknown status
    }
  };


  return (
    <div>
      <ToastContainer />
      <Container>
        <MainContainer>
          {/* <Btn onClick={toggleCreateChecklist}>
            <CreateBtn text="Create New Checklist" />
          </Btn> */}
          <RightActions>
            {/* <SelectTags options={optionValue} /> */}
            <ExportBtn ExportData={handleExportData} />
            <SearchBar placeholder={"Search name or id number"} onChange={handleSearch} />
            <SortBtn onFilter={handleFilter} />
          </RightActions>
          {openCreateChecklist && (
            <ModalOverlay>
              <CreateChecklistForm
                onClose={closeCreateChecklist}
              // createChecklistData={handleCreateChecklist}
              // updateChecklistData={handleUpdateChecklist}
              // newChecklist={newChecklist}
              // ChecklistData={editChecklistData}
              />
            </ModalOverlay>
          )}{" "}
        </MainContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Sl no.</Th>
              <Th>Type</Th>
              <Th>prepaidDate</Th>
              <Th>site</Th>
              <Th>prepaidBy</Th>
              <Th>Checked By</Th>
              <Th>Status</Th>
              <Th>Submitted Date</Th>
              {/* <Th>Settings</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {checklists.checklist && checklists.checklist.length > 0 ? (
              checklists.checklist.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{(1 - 1) * 5 + index + 1}</Td>
                  <Td>{item.type}</Td>
                  <Td>{item.prepaidDate}</Td>
                  <Td>{item.site}</Td>
                  <Td>{item.prepaidBy}</Td>
                  <Td>{item.checkedBy}</Td>
                  <Td style={{ color: getStatusColor(item.status) }}>{item.status}</Td>
                  <Td>{item.submittedDate ? item.submittedDate : "............................."}</Td>
                  <Td>
                    {/* <Btn style={{ color: "Blue" }} onClick={() => handleEditChecklist(item)}>Edit</Btn>
            <Btn style={{ color: "Red" }} onClick={() => handleDeleteClick(item.id)} >Delete</Btn> */}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="10">No checklists available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        <Pagination initialPage={page} totalPages={checklists.totalPages} getData={setPage} />
      </Container>

      {showDeleteModal && (
        <DeleteModal>
          <ModalContent>
            <p>{storedID}</p>
            <ModalTitle>Confirm Delete</ModalTitle>
            <p>Are you sure you want to delete this Checklist?</p>
            <ButtonGroup>
              {/* <DeleteButton onClick={() => handleDeleteChecklist(storedID)}>Delete</DeleteButton>
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton> */}
            </ButtonGroup>
          </ModalContent>
        </DeleteModal>
      )}


    </div>
  );
};

const mapStateToProps = (state) => ({
  checklists: state.checklist.checklists,
  bufferdata: state.checklist.bufferdata,
  loading: state.checklist.loading,
  error: state.checklist.error
});

export default connect(mapStateToProps, { fetchChecklist, exportChecklist })(Checklist);

const Container = styled.div`
  width: 98%;
  margin: 0 auto;
`;
const MainContainer = styled.div`
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
  justify-content:flex-end;
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
