import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../ThemeConfig";
import settings from "../assets/icons/settings_FILL0_wght200_GRAD0_opsz24 2.svg";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
import InventoryForm from "../components/screens/createProject/CreateInventoryForm";
import { connect } from 'react-redux';
import CreateBtn from "../components/includes/CreateBtn";
import Pagination from "../components/includes/Pagination";
import { createinventory, getinventory } from "../actions/InventoryActions";
import { getProject } from "../actions/ProjectActions";
import { axiosInstance } from "../utils/baseurl";

const InventoryNew = ({ projects, getProject, inventorydata, getinventory, createinventory }) => {
  const [showMore, setShowMore] = useState(false);
  const [OpencreateProject, setOpenCreateProject] = useState(false);
  const [inventorytypedata, setInventorytypedata] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [inventoryType, setInventoryType] = useState('');


  useEffect(() => {
    getProject();
    getinventory();
    fetchinventorytype();
  }, [getinventory])

  useEffect(() => {
    getinventory(projectName, inventoryType);
  }, [projectName, inventoryType])


  const handleresetfilter = () => {
    setProjectName("");
    setInventoryType("");
  };


  const fetchinventorytype = async () => {
    try {
      const response = await axiosInstance.get('/inventory/getinventorytypedata');
      console.log(response.data);
      setInventorytypedata(response.data.inventorytypedata)
    } catch (error) {
      console.error(error);
    }
  }

  const createinventorytype = async (formData) => {
    try {
      await createinventory(formData)
      await fetchinventorytype()
    } catch (error) {
      console.log(console.error());
    }
  }

  const toggleCreateProject = () => {
    setOpenCreateProject(true);
  };

  const closeCreateProject = () => {
    setOpenCreateProject(false);
  };


  const showOptions = [
    {
      id: 1,
      content: "Edit",
      color: `${themes.notification_message}`,
    },
    {
      id: 2,
      content: "Delete",
      color: "red",
    },
  ];
  const table_contents = [
    {
      id: "01",
      type: "Mixer Machine",
      numbers: 4,
      sites: ["L P Construction", "Nila Apartments", "Ken Construction"],
      inUse: 2,
      siteInCharge: "Arun",
      request: "No",
      maintenance: "No",
    },
    {
      id: "02",
      type: "Mixer Machine",
      numbers: 4,
      sites: ["L P Construction", "Nila Apartments", "Ken Construction"],
      inUse: 2,
      siteInCharge: "Arun",
      request: "No",
      maintenance: "No",
    },
    {
      id: "03",
      type: "Mixer Machine",
      numbers: 4,
      sites: ["L P Construction", "Nila Apartments", "Ken Construction"],
      inUse: 2,
      siteInCharge: "Arun",
      request: "No",
      maintenance: "No",
    },
  ];



  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };


  return (
    <div>
      <Container>
        <Title>Inventory</Title>

        <MainContainer>
          <RightActions>
            <Select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            >
              <option value="">Select Site</option>
              {projects.projects && projects.projects.length > 0 ? (
                projects.projects.map((site) => (
                  <option key={site.id} value={site.name}>
                    {site.name}
                  </option>
                ))
              ) : (
                <option>No Site</option>
              )}
              <option value="Nila Apartments">Nila Apartments</option>
              <option value="Nila Apartments">Nila Apartments</option>
              <option value="Nila Apartments">Nila Apartments</option>
              <option value="Nila Apartments">Nila Apartments</option>
            </Select>

            <Select
              value={inventoryType}
              onChange={(e) => setInventoryType(e.target.value)}
            >
              <option value="">Select Type</option>
              {inventorytypedata && inventorytypedata.length > 0 ? (
                inventorytypedata.map((site) => (
                  <option key={site.id} value={site}>
                    {site}
                  </option>
                ))
              ) : (
                <option>No inventory type available</option>
              )}
              <option value="Construction">Construction</option>
              <option value="Construction">Construction</option>
              <option value="Construction">Construction</option>
              <option value="Construction">Construction</option>
            </Select>
          </RightActions>
          <RightActions>
            <Btn onClick={toggleCreateProject}>
              <CreateBtn text="Create New Inventory" />
            </Btn>
          </RightActions>
          {OpencreateProject && (
            <ModalOverlay>
              <InventoryForm
                onClose={closeCreateProject}
                onSubmit={createinventorytype}
              />
            </ModalOverlay>
          )}{" "}
        </MainContainer>

        <MaterialList>
          <Table>
            <Thead>
              <Tr>
                {/* <Th>Sl No.</Th> */}
                <Th>Type</Th>
                <Th>Numbers</Th>
                <Th>Sites</Th>
                <Th>In Use</Th>
                <Th>Site Incharge</Th>
                <Th>Request</Th>
                <Th>Maintenance</Th>
                <Th style={{ height: "53px", width: "53px" }}>
                  <Image src={settings} alt="settings" />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {inventorydata.inventorydata && inventorydata.inventorydata.length > 0 ? (
                inventorydata.inventorydata.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>{item.InventoryType.name}</Td>
                    <Td>{inventorydata.inventoryCount[item.InventoryType.name]}</Td> {/* Display count of the corresponding inventory type */}
                    <Td>
                      <Select>
                        <option value={item.project.name}>{item.project.name}</option>
                      </Select>
                    </Td>
                    <Td>{item.in_use ? "Yes" : "No"}</Td>
                    <Td>{item.site_incharge}</Td>
                    <Td style={{ color: item.request ? "red" : "inherit" }}>
                      {item.request ? "Yes" : "No"}
                    </Td>
                    <Td>{item.maintenance ? "Yes" : "No"}</Td>
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
                          {showOptions &&
                            showOptions.map((option, index) => {
                              return (
                                <option
                                  key={option.id}
                                  style={{
                                    color: `${option.color}`,
                                    padding: "8px 10px",
                                  }}
                                >
                                  {option.content}
                                </option>
                              );
                            })}
                        </DropDown>
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="7">No inventory available</Td>
                </Tr>
              )}
            </Tbody>

          </Table>
        </MaterialList>
        
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.inventory.message,
  projects: state.project.projects,
  inventorydata: state.inventory.inventorydata,
  loading: state.inventory.loading,
  error: state.inventory.error
});

export default connect(mapStateToProps, { getinventory, createinventory, getProject })(InventoryNew);



const Container = styled.div`
  padding: 20px;
  width: 98%;
  margin: 0 auto;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin: 0 auto;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-weight: 400;
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

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  padding: 9px;
  margin-bottom: 10px;
  border: 1px solid;
  border-radius: 4px;
  color: #888888;
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

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  background-color: #ffff;
  border-radius: 9px;
  font-size: 15px;

  &::placeholder {
    font-size: 15px;
    color: ${themes.text_9};
    font-weight: 275;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MaterialList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MaterialItem = styled.li`
  width: calc(25% - 20px); /* 3 items per row */
  margin: 10px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MaterialCard = styled.span`
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 20px;

  &:hover {
    background-color: #d32f2f;
  }
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
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
`;
