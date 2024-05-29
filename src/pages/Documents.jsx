import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProject } from "../actions/ProjectActions";
import { axiosInstance } from "../utils/baseurl";
import { THEME_COLORS as themes } from "../ThemeConfig";
import styled from "styled-components";
import CreateBtn from "../components/includes/CreateBtn";
import reload from "../assets/icons/reload.png";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
import settings_icon from "../assets/icons/settings_FILL0_wght200_GRAD0_opsz24 2.svg";
import note from "../assets/icons/note_stack_add.png";
import settings from "../assets/icons/settings_applications.png";
import news from "../assets/icons/news.png";
import save_as from "../assets/icons/save_as.png";
import handshake from "../assets/icons/handshake.png";
import draw from "../assets/icons/draw.png";
import note_alt from "../assets/icons/note_alt.png";
import calendar from "../assets/icons/calendar_clock1.png";
import fact from "../assets/icons/fact_check.png";
import Pagination from "../components/includes/Pagination";
import { createDocument, deleteDocument, getDocument, updateDocument } from "../actions/DocumentActions";
import { fetchUsers } from "../actions/UserActions";
import { ToastContainer } from "react-toastify";
import socket from "../utils/socket";


// const Documents = ({ projects, getProject }) => {
const Documents = ({ projects, document, users, fetchUsers, getDocument, createDocument, deleteDocument, updateDocument, getProject }) => {
  const [OpencreateProject, setOpenCreateProject] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    projectId: "",
    DocumentTypeId: "",
    description: "",
    selectedUsers: null,
    sendNotification: false,
    file: "",
  });


  const topBoxes = [
    {
      icon: fact,
      desc: "Check Lists",
      color: `${themes.checklist}`,
    },
    {
      icon: calendar,
      desc: "Project Schedule",
      color: `${themes.schedule}`,
    },
    {
      icon: note_alt,
      desc: "DRP",
      color: `${themes.drp}`,
    },
    {
      icon: draw,
      desc: "Drawings",
      color: `${themes.drawings}`,
    },
    {
      icon: handshake,
      desc: "Agreement",
      color: `${themes.agreements}`,
    },
    {
      icon: save_as,
      desc: "Official Documents",
      color: `${themes.official}`,
    },
    {
      icon: news,
      desc: "News",
      color: `${themes.invoice}`,
    },
    {
      icon: settings,
      desc: "Work Specification",
      color: `${themes.work_spec}`,
    },
    {
      icon: note,
      desc: "Report",
      color: `${themes.report}`,
    },
  ];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentID, setDocumentID] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentdata, setDocumentData] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(document.totalPages);


  useEffect(() => {
    // Fetch projects when component mounts
    getDocument(page, limit, selectedSite, selectedDocumentType);
    getProject();
    fetchUsers();
    fetchDocumentTypes();
  }, [page, getProject, selectedDocumentType, selectedSite, getDocument]);


  console.log(document);
  const handleCreateDocument = async (e) => {
    e.preventDefault();
    await createDocument(formData);
    await getDocument();
    setOpenCreateProject(false);
  };


  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };


  const toggleModal = () => {
    setisEdit(false)
    setOpenCreateProject(true);
  };


  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOptionText =
      event.target.options[event.target.selectedIndex].text;

    // Check if the option is already selected
    const existingOptionIndex = selectedOptions.findIndex(
      (option) => option.value === selectedValue
    );

    if (existingOptionIndex !== -1) {
      // Remove existing option if it's already selected
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(existingOptionIndex, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      // Add new option
      setSelectedOptions([
        ...selectedOptions,
        { value: selectedValue, text: selectedOptionText },
      ]);
    }
  };

  const fetchDocumentTypes = async () => {
    try {
      const response = await axiosInstance.get('/document/getdocumenttypes');
      setDocumentTypes(response.data.documenttypedata);
    } catch (error) {
      console.error('Error fetching document types:', error);
      // Handle error
    }
  };

  const handleCloseOption = (option) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
  };

  const handleSelectDocumentType = (documentType, index) => {
    // Perform actions when a document type is selected
    console.log('Selected document type:', documentType);
    setSelectedDocumentType(documentType);
    setSelectedBox(index);
    if (documentType === "Checklists") {
      fetchChecklist();
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };


  const handleResetFilter = () => {
    setSelectedDocumentType("");
    setSelectedSite(null);
    setSelectedBox(null);
  }


  const handleSelectSite = (siteId) => {
    // Perform actions when a site is selected
    setSelectedSite(siteId);
  };


  const handleViewNavigate = (data) => {
    navigate('/documentview', { state: { data: data } });
  };


  const handleEditDocument = (item) => {
    console.log(item);
    setisEdit(true)
    setOpenCreateProject(true)
    setFormData(item)
  }

  const handleUpdateDocument = async (e) => {
    e.preventDefault();
    await updateDocument(formData);
    await getDocument();
    setOpenCreateProject(false);
  };

  const handleDeleteClick = (documentID) => {
    setDocumentID(documentID);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteDocument = async (documentID) => {
    await deleteDocument(documentID); // Pass the storedID directly to your action
    setShowDeleteModal(false);
    getDocument(); // Refresh project data
  };


  return (

    <>
      <ToastContainer />
      <Container>

        <TopBoxContainer>
          {topBoxes &&
            topBoxes.map((box, index) => {
              return (
                <Box
                  className={selectedBox === index ? "highlightedBox" : ""}
                  key={index}
                  onClick={() => handleSelectDocumentType(box.desc, index)}

                >
                  <BoxLeft style={{ backgroundColor: `${box.color}` }}>
                    <Icon src={box.icon} />
                  </BoxLeft>

                  <Heading>{box.desc}</Heading>
                </Box>
              );
            })}
        </TopBoxContainer>
        <ButtonContainer>
          <Left>
            <Select onChange={(e) => handleSelectSite(e.target.value)}>
              <option value="">Select Site</option>
              {projects.projects && projects.projects.length > 0 ? (
                projects.projects.map((site) => (
                  <option key={site.id} value={site.name}>
                    {site.name}
                  </option>
                ))
              ) : (
                <option>No Option Available</option>
              )}
            </Select>
            <IconContainer>
              {" "}
              <Icon onClick={handleResetFilter} src={reload} alt="reload" />
            </IconContainer>
          </Left>
          <CreateBtn text="Create New Document" onClick={toggleModal} />
        </ButtonContainer>
        <MainContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Sl no.</Th>
                <Th>Title</Th>
                <Th>Site</Th>
                <Th>Document Type</Th>
                {/* <Th>Submitted Date</Th> */}
                <Th>View</Th>
                <Th style={{ height: "50px", width: "50px" }}>
                  <Icon src={settings_icon} alt="Settings" />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {document.documentdata &&
                document.documentdata.map((data, index) => {
                  return (
                    <Tr key={data.id}>
                      <Td>{(page - 1) * 5 + index + 1}</Td>
                      <Td>{data.title}</Td>
                      <Td>{data.project.name}</Td>
                      <Td>{data.DocumentType.name}</Td>
                      {/* <Td>
                      {data.createdAt ? data.createdAt : "............................."}
                    </Td> */}
                      <Td onClick={() => handleViewNavigate(data)}>
                        <Link >View</Link>
                      </Td>
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
                        <Icon
                          src={more}
                          alt="more"
                          style={{ cursor: "pointer" }}
                        />
                        {showMore[index] && (
                          <DropDown>
                            <option
                              style={{
                                color: `${themes.info_text}`,
                                padding: "8px 10px",
                              }}
                              onClick={() => handleEditDocument(data)}
                            >
                              Edit
                            </option>
                            <option
                              style={{
                                color: `${themes.error_text}`,
                                padding: "8px 10px",
                              }}
                              onClick={() => handleDeleteClick(data.id)}

                            >
                              Delete
                            </option>
                          </DropDown>
                        )}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
          <Pagination initialPage={page} totalPages={document.totalPages} getData={setPage} />
        </MainContainer>
        {showDeleteModal && (
          <DeleteModal>
            <ModalContent>
              <ModalTitle>Confirm Delete</ModalTitle>
              <p>Are you sure you want to delete this project?</p>
              <ButtonGroup>
                <DeleteButton onClick={() => handleDeleteDocument(documentID)}>
                  Delete
                </DeleteButton>
                <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
              </ButtonGroup>
            </ModalContent>
          </DeleteModal>
        )}
        {OpencreateProject && (
          <ModalOverlay>
            <ModalContainer>
              <ModalHead>
                {isEdit ?
                  <Heading>Update Document</Heading>
                  :
                  <Heading>Create Document</Heading>
                }
                <span onClick={() => setOpenCreateProject(false)}>
                  <i
                    class="bx bx-x"
                    style={{ fontSize: "30px", cursor: "pointer" }}
                  ></i>
                </span>
              </ModalHead>

              <Form>
                <Input type="text" placeholder="Document Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />

                <TextArea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"

                ></TextArea>


                <Select
                  id="documentTypeId"
                  name="DocumentTypeId"
                  value={formData.DocumentTypeId}
                  onChange={handleChange}>
                  <option value="">Select DocumentType</option>
                  {documentTypes && documentTypes.length > 0 ? (
                    documentTypes.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))
                  ) : (
                    <option>No Option Available</option>
                  )}
                </Select>

                <Select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}>
                  <option value="">Select Site</option>
                  {projects.projects && projects.projects.length > 0 ? (
                    projects.projects.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))
                  ) : (
                    <option>No Option Available</option>
                  )}
                </Select>


                <Select
                  name="selectedUsers"
                  value={formData.selectedUsers}
                  onChange={handleChange}>
                  <option value="">Select Users</option>
                  {users.data && users.data.length > 0 ? (
                    users.data.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))
                  ) : (
                    <option>No Option Available</option>
                  )}
                </Select>

                <Label>
                  <Checkbox
                    name="sendNotification"
                    id="sendNotification"
                    checked={formData.sendNotification}
                    onChange={handleChange}
                  />
                  Send Notification to User
                </Label>

                <NotificationOptions>
                  {selectedOptions.map((option) => (
                    <div
                      key={option.value}
                      className="selected-option"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "white",
                        padding: "12px",
                        borderRadius: "5px",
                      }}
                    >
                      <span style={{ marginRight: "12px" }}>{option.text}</span>
                      <button onClick={() => handleCloseOption(option)}>
                        <i class="bx bx-x" style={{ fontSize: "20px" }}></i>
                      </button>
                    </div>
                  ))}
                </NotificationOptions>

                <Input
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  type="file" placeholder="Choose File" />

                {isEdit ?
                  <FormButtons>
                    <Button type="submit" onClick={handleUpdateDocument}>Update Document</Button>
                  </FormButtons>
                  :
                  <FormButtons>
                    <Button type="submit" onClick={handleCreateDocument}>Create Document</Button>
                  </FormButtons>
                }
              </Form>

            </ModalContainer>
          </ModalOverlay>
        )}
      </Container>
    </>
  );
};



const mapStateToProps = (state) => ({
  message: state.document.message,
  users: state.user.users,
  projects: state.project.projects,
  document: state.document.documents,
  loading: state.document.loading,
  error: state.document.error,
});

export default connect(mapStateToProps, { getDocument, fetchUsers, createDocument, updateDocument, deleteDocument, getProject })(Documents);



const TopBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 40px 0;
`;
const Box = styled.div`
  background-color: ${themes.background_3};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;

  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  &.highlightedBox {
    border: 2px solid blue;
  }
`;


const FormButtons = styled.div`
  margin: 20px 0;
  justify-self: flex-end;
`;

// const Button = styled.button`
//   padding: 10px 20px;
//   border-radius: 5px;
//   background-color: ${themes.primary_btn};
//   color: white;
// `;

const BoxLeft = styled.div`
  height: 55px;
  width: 55px;
  padding: 15px;
  border-radius: 18px;
`;
const Heading = styled.h2`
  font-weight: 300;
  font-size: 18px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

  background: rgba(113, 113, 113, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  z-index: 999;
`;
const ModalHead = styled.div`
  background-color: ${themes.background_1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 20px;
  margin-bottom: 20px;
  border-radius: 12px 12px 0 0;
`;
const ModalContainer = styled.div`
  background-color: #e0edea;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;
const CloseButton = styled.div`
  cursor: pointer;
`;
const Form = styled.form`
  display: grid;
  justify-items: center;
  gap: 20px;
  padding: 40px 0;
`;
const Input = styled.input`
  width: 80%;
  padding: 12px;
  border-radius: 5px;
  border: none;
  background: ${themes.background_1};

  &::placeholder {
    font-size: 16px;
    font-weight: 300;
  }
`;
const TextArea = styled.textarea`
  width: 80%;
  resize: vertical;
  padding: 12px;
  border-radius: 5px;
  border: none;
  background: ${themes.background_1};
  &::placeholder {
    font-size: 16px;
    font-weight: 300;
  }
`;
const NotificationOptions = styled.div`
  display: flex;
  gap: 40px;
`;
//BOX
const MainContainer = styled.div`
  width: 98%;
  margin: 20px auto;
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px; */
`;
const SubContainer = styled.div`
  background-color: #fff;
  width: auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const IconContainer = styled.div`
  height: 56px;
  width: 56px;
  padding: 20px;
  border-radius: 18px;
  cursor: pointer;
`;
const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Right = styled.div``;
const RightHead = styled.h3`
  padding-bottom: 10px;
  // border-bottom: 2px solid ${themes.text_8};
  font-weight: 400;
  font-size: 16px;
  color: ${themes.text_8};
`;
const RightValue = styled.p`
  font-weight: 600;
  font-size: 35px;
  color: ${themes.text_8};
`;


const Label = styled.label`
    display: flex;
    align-items: center;
    font-size: 16px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin-right: 10px;
    width: 16px;
    height: 16px;
`;

// Styled components
const Container = styled.div`
  width: 98%;
  margin: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  place-items: flex-start;
`;

const Select = styled.select`
  padding: 12px;
  margin-bottom: 10px;
  width: 80%;
  border-radius: 5px;
  border: none ;
  background: ${themes.background_1};
`;

const Button = styled.button`
  padding: 8px 30px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: green;
  color: white;
  border: none;
  &:hover {
    background-color: #4caf50;
  }
`;

const Message = styled.div`
  margin-bottom: 10px;
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
  vertical-align: middle;
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


const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #f0f2f5;
`;
