import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { THEME_COLORS as themes } from "../ThemeConfig";
import { createinventory, getinventory } from '../actions/InventoryActions';
import { connect } from 'react-redux';
import { getProject } from '../actions/ProjectActions';
import { axiosInstance } from '../utils/baseurl';
import InventoryForm from '../components/screens/createProject/CreateInventoryForm';
import CreateBtn from '../components/includes/CreateBtn';

const Inventory = ({ projects, getProject, inventorydata, getinventory, createinventory }) => {
  const [OpencreateProject, setOpenCreateProject] = useState(false);
  const [inventorytypedata, setInventorytypedata] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [inventoryType, setInventoryType] = useState('');

  useEffect(() => {
    getProject();
    getinventory();
    fetchinventorytype()
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
      console.log(console.error());
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


  return (
    <Container>
      <Title>Inventory Management</Title>
      <MainContainer>
        <RightActions>
          <Select
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}>
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
          </Select>

          <Select
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}>
            <option value="">Select Type</option>
            {inventorytypedata && inventorytypedata.length > 0 ? (
              inventorytypedata.map((site) => (
                <option key={site.id} value={site.name}>
                  {site.name}
                </option>
              ))
            ) : (
              <option>No inventorytype available</option>
            )}
          </Select>
          <Btn onClick={handleresetfilter}><i class='bx bx-reset' style={{ color: '#ff0000' }} ></i></Btn>
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
              <Th>Type</Th>
              <Th>Numbers</Th>
              <Th>Sites</Th>
              <Th>In Use</Th>
              <Th>Site Incharge</Th>
              <Th>Request</Th>
              <Th>Maintenance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventorydata && inventorydata.length > 0 ? (
              inventorydata.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.InventoryType.name}</Td>
                  <Td>{item.InventoryType.count}</Td>
                  <Td style={{ fontWeight: 700 }}>{item.project.name}</Td>
                  <Td>{item.in_use ? 'Yes' : 'No'}</Td>
                  <Td>{item.site_incharge}</Td>
                  <Td style={{ color: item.request ? 'red' : 'inherit' }}>
                    {item.request ? 'Yes' : 'No'}
                  </Td>

                  <Td>{item.maintenance ? 'Yes' : 'No'}</Td>
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
  );
};



const mapStateToProps = (state) => ({
  message: state.inventory.message,
  projects: state.project.projects,
  inventorydata: state.inventory.inventorydata,
  loading: state.inventory.loading,
  error: state.inventory.error
});

export default connect(mapStateToProps, { getinventory, createinventory, getProject })(Inventory);



const Container = styled.div`
padding:20px;
width: 98%;
margin: 0 auto;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  padding:20px;
  margin: 0 auto;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  text-align: center;
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
  display:flex;
  gap:10px;
`;

const Select = styled.select`
  padding: 9px;
  margin-bottom: 10px;
  width:40%;
  border:1px solid;
  border-radius:4px;
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
