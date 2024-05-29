import React, { useEffect, useState } from "react";
import { THEME_COLORS as themes } from "../ThemeConfig";
import styled from "styled-components";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
import { connect } from "react-redux";
import settings from "../assets/icons/settings_FILL0_wght200_GRAD0_opsz24 2.svg";
import Pagination from "../components/includes/Pagination";
import { getProject } from "../actions/ProjectActions";
import { getmaterial, getmaterialrequest, getmaterialtypes, updatematerial, updatematerialrequest } from "../actions/MaterialActions";
import { ToastContainer } from "react-toastify";

const ApprovedInventory = ({
  projects,
  material,
  materialtype,
  materialrequest,
  getmaterialrequest,
  updatematerialrequest,
  getProject,
  getmaterial,
  getmaterialtypes,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(materialrequest.totalPages);
  const [showMore, setShowMore] = useState(false);
  const [MaterialTypeFilter, setMaterialTypeFilter] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    fromSite: null,
    status: "",
    comment: "",
  });


  useEffect(() => {
    getProject();
    getmaterialrequest(page, limit, MaterialTypeFilter);
    getmaterial();
    getmaterialtypes(); // Ensure consistent naming with the action creator
  }, [getProject, getmaterialrequest, MaterialTypeFilter, getmaterial, getmaterialtypes]); // Include all dependencies in the dependency array


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in formData
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (status, id) => {
    // Update formData with new status and id
    const updatedFormData = {
      ...formData,
      status: status,
      id: id
    };

    // Update the local state with new formData
    setFormData(updatedFormData);

    // Call updatematerialrequest with updatedFormData
    await updatematerialrequest(updatedFormData);

    // After updating material request, fetch the updated data
    await getmaterialrequest();
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
  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };


  return (
    <div>
      <ToastContainer />
      <Container>
        <Heading>Inventory Request</Heading>
        <Top>
          <Label for="type">Material Type</Label>
          <Select
            id="product"
            value={MaterialTypeFilter ? MaterialTypeFilter : ""}
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
        </Top>

        <Table>
          <Thead>
            <Tr>
              <Th>Material id</Th>
              <Th>Material Name</Th>
              <Th>Current Stock</Th>
              <Th>From Site</Th>
              <Th>To Site</Th>
              <Th>Requested By</Th>
              <Th>Requested Quantity</Th>
              <Th>Date</Th>
              <Th>Comment</Th>
              <Th style={{ height: "50px", width: "50px" }}>
                <Image src={settings} alt="Settings" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {materialrequest.materialrequestdata && materialrequest.materialrequestdata.length > 0 ? (
              materialrequest.materialrequestdata
                .filter(data => data.status === "Pending") // Filter by status "Pending"
                .map((data, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{data.Material.MaterialType.materialid}</Td>
                      <Td>{data.Material.MaterialType.name}</Td>
                      <Td>{data.Material.availableStock}</Td>
                      <Td>
                        <Select id="stores" name="fromSite" onChange={handleChange}>
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
                      </Td>
                      <Td>{data.toSiteProject.name}</Td>
                      <Td>{data.User.name}</Td>
                      <Td>{data.quantityRequested}</Td>
                      <Td>{new Date(data.createdAt).toLocaleDateString()}</Td>
                      <Td>
                        <Input
                          type="text"
                          id="comment"
                          placeholder="Comment"
                          onChange={handleChange}
                          name="comment"
                          value={formData.comment}
                        />
                      </Td>
                      <Td
                        onClick={() => toggleMoreSettings(index)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "53px",
                          width: "53px",
                          position: "relative",
                          cursor: "pointer",
                        }}
                      >
                        <button style={{ color: "green" }} onClick={() => handleSubmit("Approved", data.id)}>Approve</button>
                        <button style={{ color: "red" }} onClick={() => handleSubmit("Rejected", data.id)}>Reject</button>
                      </Td>
                    </Tr>
                  );
                })
            ) : (
              <Tr>
                <Td colSpan="10" style={{ textAlign: "center" }}>No data available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Pagination initialPage={page} totalPages={materialrequest.totalPages} getData={setPage} />
      </Container>
    </div >
  );
};

const mapStateToProps = (state) => ({
  message: state.project.message,
  material: state.material.material,
  materialtype: state.material.materialtype,
  materialrequest: state.material.materialrequest,
  projects: state.project.projects,
  loading: state.project.loading,
  error: state.project.error,
});



export default connect(mapStateToProps, {
  getProject,
  getmaterial,
  getmaterialtypes,
  getmaterialrequest,
  updatematerialrequest
})(ApprovedInventory);


const Container = styled.div`
  margin: 20px;
`;

const Heading = styled.div`
  padding: 20px 0;
  font-weight: 400;
  font-size: 30px;
`;

const Top = styled.div``;
const Label = styled.label`
  font-weight: 400;
  font-size: 15px;
  display: block;
  margin: 20px 0;
`;
const Select = styled.select`
  padding: 10px 20px;
  padding-right: 50px; /* Adjust the right padding as needed */
  border-radius: 8px;
  border: 1px solid #888;
  background: url('data:image/svg+xml;utf8,<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')
    no-repeat right 10px center/12px; /* 12px is the size of the arrow icon */
  -webkit-appearance: none; /* Remove default arrow icon */
  -moz-appearance: none;
  appearance: none;
`;

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
