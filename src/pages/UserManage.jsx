import React, { useState, useEffect } from "react";
import ExportBtn from "../components/includes/ExportBtn";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
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
import { connect } from "react-redux";

import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../actions/UserActions"; // Import action creators
import CreateUserForm from "../components/screens/createProject/CreateUserForm";
import { showNotification } from "../utils/toastmessage";
import { ToastContainer } from "react-toastify";
import { axiosInstance } from "../utils/baseurl";
import { useNavigate } from "react-router";

const UserManage = ({
  users,
  message,
  loading,
  error,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
}) => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(users.totalPages);
  const [showMore, setShowMore] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [newuser, setnewuser] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storedID, setStoredID] = useState(null);
  const [ExportData, setExportData] = useState(null);
  const [pdfBuffer, setPdfBuffer] = useState(null); // State to store PDF buffer
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers(page, limit);
  }, [page, fetchUsers]);

  console.log(users);

  const handleSearch = (e) => {
    fetchUsers("", "", e.target.value)
  };


  const handleFilter = (option) => {
    // Call getInvoices with the selected sorting option
    if (option === "Name A-Z") {
      fetchUsers('', "name", "ASC"); // Pass an empty string for searchTerm
    } else if (option === "Date") {
      fetchUsers('', "date", "ASC"); // Pass an empty string for searchTerm
    }
  };

  const handleExportData = async (format) => {
    try {
      const response = await axiosInstance.get("/user/exportuserdata", {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          format,
        },
        responseType: "arraybuffer", // Specify arraybuffer response type to receive binary data
      });
      if (format === "PDF") {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "User.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (format === "CSV") {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "User.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleEditUser = (item) => {
    console.log("item", item);
    setEditUserData((prevData) => ({ ...prevData, ...item }));
    setOpenCreateUser(true);
    setnewuser(false);
  };

  const handleCreateUser = async (formData) => {
    try {
      await createUser(formData);
      showNotification({ type: "SUCCESS", message: message }); // Show success notification
      fetchUsers(); // Refresh User data
    } catch (error) {
      showNotification({ type: "ERROR", message: error }); // Show error notification
    }
  };

  const handleUpdateUser = async (formData) => {
    try {
      await updateUser(formData);
      fetchUsers(); // Refresh User data
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (UserId) => {
    setStoredID(UserId);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteUser = async (storedID) => {
    try {
      await deleteUser(storedID); // Pass the storedID directly to your action
      setShowDeleteModal(false);
      fetchUsers(); // Refresh User data
    } catch (error) { }
  };

  const toggleCreateUser = () => {
    setOpenCreateUser(true);
    setnewuser(true);
  };

  const closeCreateUser = () => {
    setOpenCreateUser(false);
  };


  const handleProfileNavigate = (item) => {
    navigate('/userprofile', { state: item })
  }

  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };


  const optionValue = ["2020", "2021", "2022", "2023", "2024"];

  return (
    <div>
      <ToastContainer />
      <Container>
        <MainContainer>
          <Btn onClick={toggleCreateUser}>
            <CreateBtn text="Create New User" />
          </Btn>
          <RightActions>
            <SelectTags options={optionValue} />
            <ExportBtn ExportData={handleExportData} />
            <SearchBar placeholder={"Search ...."} onChange={handleSearch} />
            <SortBtn onFilter={handleFilter} />
          </RightActions>
          {openCreateUser && (
            <ModalOverlay>
              <CreateUserForm
                onClose={closeCreateUser}
                createUserData={handleCreateUser}
                updateUserData={handleUpdateUser}
                newuser={newuser}
                userData={editUserData}
              />
            </ModalOverlay>
          )}{" "}
        </MainContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Job Role</Th>
              <Th>Access Level</Th>
              <Th>Phone Number</Th>
              <Th>Status</Th>
              <Th>Join Date</Th>
              <Th>Blood Group</Th>
              <Th>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.data && users.data.length > 0 ? (
              users.data.map((item, index) => (
                <Tr key={item.id} >
                  <Td onClick={() => handleProfileNavigate(item)} ><img className="" style={{ width: "50px", objectFit: "cover" }} src={item.image}></img></Td>
                  <Td>{item.idNumber}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.jobRole}</Td>
                  <Td>
                    {item.Role && item.Role.roletype
                      ? item.Role.roletype
                      : "null"}
                  </Td>
                  <Td>{item.phoneNo}</Td>
                  <Td>{item.status ? <GreenDot /> : <RedDot />}</Td>
                  <Td>{item.joinDate}</Td>
                  <Td>{item.bloodGroup}</Td>
                  <Td
                    onClick={() => toggleMoreSettings(index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "53px",
                      width: "53px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <Image src={more} alt="more" />
                    {showMore[index] && (
                      <DropDown>
                        <option
                          style={{
                            color: "blue",
                            padding: "8px 10px",
                          }}
                          onClick={() => handleEditUser(item)} >
                          Edit
                        </option>
                        <option

                          style={{
                            color: "red",
                            padding: "8px 10px",
                          }}
                          onClick={() => handleDeleteClick(item.id)}   >
                          Delete
                        </option>
                      </DropDown>
                    )}
                  </Td>

                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="10">No users available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        <Pagination initialPage={page} totalPages={users.totalPages} getData={setPage} />
      </Container>

      {showDeleteModal && (
        <DeleteModal>
          <ModalContent>
            <p>{storedID}</p>
            <ModalTitle>Confirm Delete</ModalTitle>
            <p>Are you sure you want to delete this user?</p>
            <ButtonGroup>
              <DeleteButton onClick={() => handleDeleteUser(storedID)}>
                Delete
              </DeleteButton>
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
            </ButtonGroup>
          </ModalContent>
        </DeleteModal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.user.message,
  users: state.user.users,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps, {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
})(UserManage);

const Container = styled.div`
  width: 98%;
  margin: 8px auto;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  margin: 0 auto;
`;

const DropDown = styled.div`
  background-color: ${themes.notification};
  border-radius: 8px;
  position: absolute;
  padding: 0 20px;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 15px;
  z-index: 2;
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

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`;

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
