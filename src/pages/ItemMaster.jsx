import React, { useState, useEffect } from "react";
import { THEME_COLORS as themes } from "../ThemeConfig";
import styled from "styled-components";
import CreateBtn from "../components/includes/CreateBtn";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
import { connect } from "react-redux";
import settings from "../assets/icons/settings_FILL0_wght200_GRAD0_opsz24 2.svg";
import Pagination from "../components/includes/Pagination";
import { getProject } from "../actions/ProjectActions";
import { ToastContainer } from "react-toastify";
import { TextField, Autocomplete } from '@mui/material';
import {
  creatematerial,
  deletematerial,
  getmaterial,
  getmaterialtypes,
  updatematerial,
} from "../actions/MaterialActions";


import { Link } from "react-router-dom";


const ItemMaster = ({
  projects,
  material,
  materialtype,
  getProject,
  getmaterial,
  updatematerial,
  deletematerial,
  getmaterialtypes,
  creatematerial,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(material.totalPages);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    materialid: "",
    category: "",
    materialname: "",
    unit: "",
    currentStock: null,
    purchasedRate: "",
    projectId: null,
    hsnCode: "",
    newStock: null,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materialID, setmaterialID] = useState(null);
  const [MaterialType, setMaterialType] = useState(null);
  const [MaterialTypeFilter, setMaterialTypeFilter] = useState("");
  const [siteFilter, setsiteFilter] = useState(null);

  useEffect(() => {
    getProject();
    getmaterialtypes(); // Ensure consistent naming with the action creator
  }, [getProject, getmaterial, getmaterialtypes]); // Include all dependencies in the dependency array

  useEffect(() => {
    getmaterial(page, limit, MaterialTypeFilter, siteFilter);
  }, [page, MaterialTypeFilter, siteFilter]); // Include all dependencies in the dependency array

  const handleEditMaterial = (item) => {
    setIsEdit(true);
    // Extract the necessary fields from the item object
    const { id, category, unit, projectId, currentStock, purchasedRate, hsnCode, availableStock, MaterialType } = item;
    // Set the form data with the extracted values
    setFormData({
      id,
      materialid: MaterialType.id,
      category,
      materialname: MaterialType.name,
      unit: MaterialType.unit,
      projectId,
      currentStock: MaterialType.count,
      purchasedRate,
      hsnCode,
      newStock: availableStock,
    });
    setMaterialType(MaterialType);
    // Show the modal
    setShowModal(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in formData
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProjectIDChange = (event, value) => {
    console.log("value", value);
    setFormData((prev) => ({
      ...prev,
      projectId: value ? value.projectId : null
    }));
  };


  // Handle form submission
  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    await creatematerial(formData);
    await getmaterial();
    await getProject();
    await getmaterialtypes();
    setFormData("");
    setShowModal(false);
    // Use formData in your submission logic
    console.log(formData);
  };

  const handleUpdateMaterial = async (e) => {
    e.preventDefault();
    await updatematerial(formData);
    await getmaterial();
    await getProject();
    await getmaterialtypes();
    setFormData("");
    setShowModal(false);
    // Use formData in your submission logic
    console.log(formData);
  };

  const openModal = () => {
    setIsEdit(false);
    setFormData("");
    setMaterialType(null);
    setShowModal(true);
  };

  const handleSaveandAddNew = () => {
    setFormData("");
    setShowModal(true);
  };

  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };

  const handleMaterialIDChange = (event, newValue) => {
    if (newValue) {
      setFormData((data) => ({
        ...data,
        materialid: newValue.id,
        materialname: newValue.name,
        unit: newValue.unit,
        currentStock: newValue.count
      }));
      setMaterialType(newValue);
    } else {
      setFormData((data) => ({
        ...data,
        materialid: '',
        materialname: '',
        unit: '',
      }));
      setMaterialType(null);
    }
  };


  const handleDeleteClick = (materialID) => {
    setmaterialID(materialID);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteMaterial = async (materialID) => {
    await deletematerial(materialID); // Pass the storedID directly to your action
    setShowDeleteModal(false);
    getmaterial(); // Refresh project data
  };



  return (
    <>
      <ToastContainer />
      <Container>
        <Heading>Item Master</Heading>
        <Top>
          <Box>
            <BoxHead>Stock Value</BoxHead>
            <BoxValue>₹{material.totalValue}</BoxValue>
          </Box>
          <Box>
            <BoxHead>Excess Stock</BoxHead>
            <BoxValue>₹{material.availableStockValue}</BoxValue>
          </Box>
          <Button><Link to="/inventory" style={{ color: "white" }}>View Inventory Dashboard</Link></Button>
        </Top>
        <Mid>
          <Left>
            <MidBox>
              <Label htmlFor="product">Products</Label>
              <Select
                id="product"
                value={MaterialTypeFilter}
                onChange={(e) => setMaterialTypeFilter(e.target.value)}>
                <option value="">Select Product</option>
                {materialtype.materialtypedata &&
                  materialtype.materialtypedata.length > 0 ? (
                  materialtype.materialtypedata.map((site) => (
                    <option key={site.id} value={site.name}>
                      {site.name}
                    </option>
                  ))
                ) : (
                  <option>No materials available</option>
                )}
              </Select>
            </MidBox>
            <MidBox>
              <Label htmlFor="stores">Stores</Label>
              <Select id="stores"
                value={siteFilter}
                onChange={(e) => setsiteFilter(e.target.value)}>
                <option value="">Select Stores</option>
                {projects.projects && projects.projects.length > 0 ? (
                  projects.projects.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))
                ) : (
                  <option>No projects available</option>
                )}
              </Select>
            </MidBox>
          </Left>
          <CreateBtn text="Add New Item" onClick={openModal} />
        </Mid>
        <Table>
          <Thead>
            <Tr>
              <Th>Item id</Th>
              <Th>Item Name</Th>
              <Th>Item Category</Th>
              <Th>Current Stock</Th>
              <Th>Unit</Th>
              <Th>HSN Code</Th>
              <Th>Site/Store</Th>
              <Th>Purchased Rate</Th>
              <Th>Date</Th>
              <Th style={{ height: "50px", width: "50px" }}>
                <Image src={settings} alt="Settings" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {material.materialdata && material.materialdata.length > 0 ? (
              material.materialdata.map((data, index) => (
                <Tr key={data.id}>
                  <Td>{(page - 1) * 5 + index + 1}</Td>
                  <Td>{data.MaterialType.name}</Td>
                  <Td>{data.category}</Td>
                  <Td>{data.availableStock}</Td>
                  <Td>{data.MaterialType.unit}</Td>
                  <Td>{data.hsnCode}</Td>
                  <Td>{data.project.name}</Td>
                  <Td>{data.purchasedRate}</Td>
                  <Td>{new Date(data.createdAt).toLocaleDateString()}</Td>
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
                          onClick={() => handleEditMaterial(data)} >
                          Edit
                        </option>
                        <option

                          style={{
                            color: "red",
                            padding: "8px 10px",
                          }}
                          onClick={() => handleDeleteClick(data)}   >
                          Delete
                        </option>
                      </DropDown>
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="7">No materials available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Pagination initialPage={page} totalPages={material.totalPages} getData={setPage} />
      </Container>
      {showDeleteModal && (
        <DeleteModal>
          <ModalContent>
            <ModalTitle>Confirm Delete</ModalTitle>
            <p>Are you sure you want to delete this project?</p>
            <ButtonGroup>
              <DeleteButton onClick={() => handleDeleteMaterial(materialID)}>
                Delete
              </DeleteButton>
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
            </ButtonGroup>
          </ModalContent>
        </DeleteModal>
      )}
      {showModal && (
        <Overlay>
          <Modal>
            <ModalHead>
              {isEdit ? "Edit Items" : "Add Items"}
              <Span
                onClick={() => {
                  setShowModal(false);
                }}
              >
                {" "}
                &#x2715;
              </Span>
            </ModalHead>
            <Form onSubmit={isEdit ? handleUpdateMaterial : handleCreateMaterial}>
              <FormTop>
                <Items>
                  <Label htmlFor="materialId">Material ID</Label>
                  <Autocomplete
                    id="product"
                    options={materialtype.materialtypedata || []}
                    getOptionLabel={(option) => `${option.materialid} : ${option.name}`}
                    renderInput={(params) => <TextField {...params} label="Select Product" variant="outlined" />}
                    onChange={handleMaterialIDChange}
                    value={MaterialType}
                  />
                </Items>

                {/* <Items>
                  <Label htmlFor="materialId">Material ID</Label>
                  <Input
                    type="text"
                    id="materialid"
                    placeholder="Enter MaterialID"
                    onChange={handleChange}
                    name="materialid"
                    value={formData.materialid}
                  />
                </Items> */}
                <Items>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    placeholder="Enter Category"
                    onChange={handleChange}
                    name="category"
                    value={formData.category}
                  />
                </Items>
                <Items>
                  <Label htmlFor="materialName">Material Name</Label>
                  <Input
                    type="text"
                    id="materialName"
                    placeholder="Enter Material Name"
                    onChange={handleChange}
                    name="materialname"
                    value={formData.materialname}
                  />
                </Items>
                <Items>
                  <Label htmlFor="unit">Unit of Measurement</Label>
                  <Input
                    type="text"
                    id="unit"
                    placeholder="Enter Unit"
                    onChange={handleChange}
                    name="unit"
                    value={formData.unit}
                  />
                </Items>
                <Items>
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    type="number"
                    id="currentStock"
                    placeholder="Enter Current Stock"
                    onChange={handleChange}
                    name="currentStock"
                    value={formData.currentStock}
                  />
                </Items>

                <Items>
                  <Label htmlFor="newStock">New Stock</Label>
                  <Input
                    type="number"
                    id="newStock"
                    placeholder="Enter new Stock"
                    onChange={handleChange}
                    name="newStock"
                    value={formData.newStock}
                  />
                </Items>

                <Items>
                  <Label htmlFor="materialId">Site/Store</Label>
                  <Select
                    id="project"
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
                </Items>
                <Items>
                  <Label htmlFor="purchasedRate">Purchased Rate</Label>
                  <Input
                    type="text"
                    id="purchasedRate"
                    placeholder="Enter Purchased Rate"
                    onChange={handleChange}
                    name="purchasedRate"
                    value={formData.purchasedRate}
                  />
                </Items>
                <Items>
                  <Label htmlFor="hsnCode">HSN Code</Label>
                  <Input
                    type="text"
                    id="hsnCode"
                    placeholder="Enter HSN Code"
                    onChange={handleChange}
                    name="hsnCode"
                    value={formData.hsnCode}
                  />
                </Items>

              </FormTop>
              {isEdit ?
                <FormButtons>
                  <Button
                    type="submit"
                    style={{ background: "#077252", marginRight: "10px" }}
                  >
                    Update
                  </Button>
                </FormButtons>
                :
                <FormButtons>
                  <Button
                    type="submit"
                    style={{ background: "#077252", marginRight: "10px" }}
                  >
                    Save
                  </Button>
                  <Button onClick={handleSaveandAddNew}>Save & Add New</Button>
                </FormButtons>
              }
            </Form>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  message: state.project.message,
  material: state.material.material,
  materialtype: state.material.materialtype,
  projects: state.project.projects,
  loading: state.project.loading,
  error: state.project.error,
});

export default connect(mapStateToProps, {
  getProject,
  getmaterial,
  getmaterialtypes,
  updatematerial,
  deletematerial,
  creatematerial,
})(ItemMaster);

const Container = styled.div`
  margin: 20px;
`;

const Heading = styled.div`
  padding: 20px 0;
  font-weight: 400;
  font-size: 30px;
`;

const Top = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;

  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
`;
const BoxHead = styled.h3`
  font-weight: 400;
  font-size: 15px;
`;
const BoxValue = styled.p`
  font-weight: 500;
  font-size: 18px;
`;
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${themes.primary_btn};
  color: white;
`;
const Mid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 30px 0;
`;
const Left = styled.div`
  display: flex;
  gap: 60px;
`;
const MidBox = styled.div``;
const Label = styled.label`
  font-weight: 400;
  font-size: 15px;
  display: block;
  margin: 20px 0;
`;
const Select = styled.select`
padding: 10px 20px;
border-radius: 8px;
border: 1px solid #888;
width: 100%;

&::placeholder {
  font-weight: 300;
  font-size: 14px;
}

`;

const Table = styled.table`
  margin: 20px 0;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 10px;
  border-radius: 8px;
  padding: 20px;
`;
const Thead = styled.thead`
  font-weight: 500;
  font-size: 15px;
  background-color: ${themes.table_1};
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
`;
const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${themes.table_1};
  }
`;
const Th = styled.th`
  vertical-align: middle;
  text-align: left;
  font-weight: 500;
  font-size: 15px;
  padding: 15px;
`;
const Tbody = styled.tbody``;
const Td = styled.td`
  vertical-align: middle;
  font-weight: 300;
  font-size: 15px;
  padding: 15px;
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
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #13131349;
`;
const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 70%;
  padding: 20px 40px;
  border-radius: 20px;
  display: grid;
`;
const ModalHead = styled.h3`
  font-weight: 400;
  font-size: 30px;
  margin: 0 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #888;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Span = styled.span`
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
`;
const Form = styled.form`
  display: grid;
`;
const FormTop = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 90px;
`;
const Items = styled.div``;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #888;
  width: 100%;

  &::placeholder {
    font-weight: 300;
    font-size: 14px;
  }
`;


const FormButtons = styled.div`
  margin: 20px 0;
  justify-self: flex-end;
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
