import React, { useState, useEffect } from "react";
import ExportBtn from "../components/includes/ExportBtn";
import addBtn from "../assets/icons/add.svg";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { THEME_COLORS as themes } from "../ThemeConfig";
import SearchBar from "../components/includes/SearchBar";
import SelectTags from "../components/includes/SelectTags";
import SortBtn from "../components/includes/SortBtn";
import CreateBtn from "../components/includes/CreateBtn";
import CreateProjectForm from "../components/screens/createProject/CreateProjectForm";
import ProjectBoxes from "../components/includes/ProjectBoxes";
import Pagination from "../components/includes/Pagination";
import dots from "../assets/icons/3dots.svg";

import { connect } from "react-redux";
import {
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../actions/ProjectActions"; // Import action creators
import { axiosInstance } from "../utils/baseurl";
import config from "../utils/config";
import { ToastContainer } from "react-toastify";

const Projects = ({
  projects,
  message,
  loading,
  error,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(projects.totalPages);
  const [showMore, setShowMore] = useState(false); // settings extra btn
  const [OpencreateProject, setOpenCreateProject] = useState(false);
  const [countofproject, setcountofproject] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null);
  const [newproject, setnewproject] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storedID, setStoredID] = useState(null);
  const [ExportData, setExportData] = useState(null);
  const [pdfBuffer, setPdfBuffer] = useState(null); // State to store PDF buffer

  useEffect(() => {
    fetchCount();
  }, []);


  const fetchProjects = (page, limit) => {
    getProject(page, limit);
  };

  useEffect(() => {
    fetchProjects(page, limit);
  }, [page, getProject]);



  const fetchCount = async () => {
    const response = await axiosInstance.get("/project/countofprojects");
    if (response) {
      setcountofproject(response.data.data);
    }
  };

  console.log("projects.totalPages", projects.totalPages);



  const handleSearch = (e) => {
    getProject("", "", e.target.value);
  };


  const handleFilter = (option) => {
    // Call getInvoices with the selected sorting option
    if (option === "Name A-Z") {
      getProject("", "name", "ASC"); // Pass an empty string for searchTerm
    } else if (option === "Date") {
      getProject("", "date", "ASC"); // Pass an empty string for searchTerm
    }
  };

  const handleExportData = async (format) => {
    try {
      const response = await axiosInstance.get("/project/exportproject", {
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
        a.download = "Project.pdf";
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
        a.download = "Project.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleEditProject = (item) => {
    console.log("item", item);
    setEditProjectData((prevData) => ({ ...prevData, ...item }));
    setOpenCreateProject(true);
    setnewproject(false);
  };


  const handleCreateProject = async (formData) => {
    try {
      await createProject(formData);
      getProject(); // Refresh project data
    } catch (error) { }
  };

  const handleUpdateProject = async (formData) => {
    try {
      await updateProject(formData);
      // Show success notification
      getProject(); // Refresh project data
      fetchCount();
    } catch (error) {
      // Show error notification
    }
  };

  const handleDeleteClick = (projectId) => {
    setStoredID(projectId);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteProject = async (storedID) => {
    try {
      await deleteProject(storedID); // Pass the storedID directly to your action
      setShowDeleteModal(false);
      getProject(); // Refresh project data
    } catch (error) { }
  };

  const toggleCreateProject = () => {
    setOpenCreateProject(true);
    setnewproject(true);
  };

  const closeCreateProject = () => {
    setOpenCreateProject(false);
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };
  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };

  const optionValue = ["2020", "2021", "2022", "2023", "2024"];

  return (
    <div>
      <div id="pdfContainer"></div>
      <ToastContainer />
      <Container>
        <ProjectBoxes countofproject={countofproject} />
        <MainContainer>
          <Btn onClick={toggleCreateProject}>
            <CreateBtn text="Create New Project" />
          </Btn>
          {/* <p>{ExportData}</p> */}
          <RightActions>
            <SelectTags options={optionValue} />
            <ExportBtn ExportData={handleExportData} />
            <SearchBar placeholder={"Search ..."} onChange={handleSearch} />
            <SortBtn onFilter={handleFilter} />
          </RightActions>
          {OpencreateProject && (
            <ModalOverlay>
              <CreateProjectForm
                onClose={closeCreateProject}
                count={projects.count}
                createProjectData={handleCreateProject}
                updateProjectData={handleUpdateProject}
                newproject={newproject}
                projectData={editProjectData}
              />
            </ModalOverlay>
          )}{" "}
        </MainContainer>
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
              <Th>Halted</Th>
              <Th>Project Head</Th>
              <Th>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.projects && projects.projects.length > 0 ? (
              projects.projects.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{item.type}</Td>
                  <Td>{item.name}</Td>
                  <Td>
                    {config.settings.projectprefix}
                    {item.projectId}
                  </Td>
                  <Td>{item.location}</Td>
                  <Td>{item.startDate}</Td>
                  <Td
                    style={{
                      color:
                        new Date(item.endDate) < new Date() ? "red" : "black",
                    }}
                  >
                    {item.endDate}
                  </Td>
                  <Td>
                    <ProgressBar
                      completed={item.percentageCompleted}
                      customLabel=" "
                      height="5px"
                    />
                    <p>{item.percentageCompleted}%</p>
                  </Td>
                  <Td>{item.halted ? "true" : "false"}</Td>
                  <Td>{item.User && item.User.name ? item.User.name : "Null"}</Td>
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
                          onClick={() => handleEditProject(item)} >
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
                <Td colSpan="9">No projects available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        <Pagination initialPage={page} totalPages={projects.totalPages} getData={setPage} />
      </Container>


      {showDeleteModal && (
        <DeleteModal>
          <ModalContent>

            <ModalTitle>Confirm Delete</ModalTitle>
            <p>Are you sure you want to delete this project?</p>
            <ButtonGroup>
              <DeleteButton onClick={() => handleDeleteProject(storedID)}>
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
  message: state.project.message,
  projects: state.project.projects,
  loading: state.project.loading,
  error: state.project.error,
});

export default connect(mapStateToProps, {
  getProject,
  createProject,
  updateProject,
  deleteProject,
})(Projects);

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`;

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

const Img = styled.img``;

const ActionButtons = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 5px);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px;
  cursor: pointer;
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

