import React, { useEffect, useState } from "react";
import { THEME_COLORS as themes } from "../ThemeConfig";
import styled from "styled-components";
import more from "../assets/icons/more_vert_FILL0_wght200_GRAD0_opsz24 1.png";
import { connect } from "react-redux";
import settings from "../assets/icons/settings_FILL0_wght200_GRAD0_opsz24 2.svg";
import Pagination from "../components/includes/Pagination";
import { getProject } from "../actions/ProjectActions";
import { getmaterial, getmaterialrequest, getmaterialtypes } from "../actions/MaterialActions";

const StockMovement = ({
  projects,
  material,
  materialtype,
  materialrequest,
  getmaterialrequest,
  getProject,
  getmaterial,
  getmaterialtypes,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(materialrequest.totalPages);
  const [showMore, setShowMore] = useState(false);
  const [MaterialTypeFilter, setMaterialTypeFilter] = useState(null);
  const [MaterialStatusFilter, setMaterialStatusFilter] = useState(null);

  useEffect(() => {
    getProject();
    getmaterialrequest(page, limit, MaterialStatusFilter, MaterialTypeFilter);
    getmaterial();
    getmaterialtypes(); // Ensure consistent naming with the action creator
  }, [page, getProject, MaterialStatusFilter, MaterialTypeFilter, getmaterialrequest, getmaterial, getmaterialtypes]); // Include all dependencies in the dependency array


  const toggleMoreSettings = (index) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [index]: !prevShowMore[index], // Toggle specific dropdown based on index
    }));
  };

  return (
    <div>
      {" "}
      <Container>
        <Heading>Stock Movement</Heading>
        <Top>
          <Left>
            <MidBox>
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
            </MidBox>
            <MidBox>
              <Label for="status">Status</Label>
              <Select id="status"
                value={MaterialStatusFilter ? MaterialStatusFilter : ""}
                onChange={(e) => setMaterialStatusFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </MidBox>
          </Left>
          {/* <StockTransfer onClick={toggleModal}>Stock Transfer</StockTransfer> */}
        </Top>

        <Table>
          <Thead>
            <Tr>
              <Th>Material id</Th>
              <Th>Material Name</Th>
              <Th>From Site</Th>
              <Th>To Site</Th>
              <Th>Requested By</Th>
              <Th>Date </Th>
              <Th>Status</Th>
              <Th>Comment</Th>
              <Th style={{ height: "50px", width: "50px" }}>
                <Image src={settings} alt="Settings" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {materialrequest.materialrequestdata && materialrequest.materialrequestdata.length > 0 ? (
              materialrequest.materialrequestdata
                .filter(data => data.status !== "Pending") // Filter out "Pending" status
                .map((data, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{data.Material.MaterialType.materialid}</Td>
                      <Td>{data.Material.MaterialType.name}</Td>
                      <Td>{data.fromSiteProject ? data.fromSiteProject.name : ".............."}</Td>
                      <Td>{data.toSiteProject ? data.toSiteProject.name : ""}</Td>
                      <Td>{data.User ? data.User.name : ""}</Td>
                      <Td>{new Date(data.createdAt).toLocaleDateString()}</Td>
                      <Td
                        style={{
                          fontWeight: 500,
                          color:
                            data.status === "Approved"
                              ? "green"
                              : data.status === "Rejected"
                                ? "red"
                                : "#b40707f4",
                        }}
                      >
                        {data.status}
                      </Td>
                      <Td>{data.comment ? data.comment : ".........."}</Td>
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
                  );
                })
            ) : (
              <Tr>
                <Td colSpan="9" style={{ textAlign: "center" }}>
                  No data available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Pagination initialPage={page} totalPages={materialrequest.totalPages} getData={setPage} />
      </Container>
      {/* {openModal && (
        <Overlay>
          <Modal>
            <ModalHead>
              Stock Transfer
              <Span
                onClick={() => {
                  setopenModal(false);
                }}
              >
                &#x2715;
              </Span>
            </ModalHead>
            <Left>
              <MidBox>
                <Label for="type">Movement Type</Label>
                <Select id="type">
                  <option value="">Products</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </Select>
              </MidBox>
              <MidBox>
                <Label for="status">Status</Label>
                <Select id="status">
                  <option value="">Select</option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </Select>
              </MidBox>
            </Left>
            <Table className="modalTable">
              <Thead>
                <Tr>
                  <Th> No.</Th>
                  <Th>Item ID</Th>
                  <Th>Item Name</Th>
                  <Th>Transfer Quantity</Th>
                  <Th>Purchase Date</Th>
                  <Th>Comment</Th>
                </Tr>
              </Thead>
              <Tbody className="modalTableBody">
                {ModalTable &&
                  ModalTable.map((data, index) => {
                    return (
                      <Tr className="modalTableRow">
                        <Td>{data.no}</Td>
                        <Td>{data.itemID}</Td>
                        <Td>{data.Itemname}</Td>
                        <Td>{data.Qty}</Td>
                        <Td>{data.price}</Td>
                        <Td>{data.comment}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
            <Button>Save</Button>
          </Modal>
        </Overlay>
      )} */}
    </div>
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
  getmaterialrequest
})(StockMovement);


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
  justify-content: space-between;
  align-items: flex-end;
`;
const Left = styled.div`
  display: flex;
  gap: 40px;
`;
const StockTransfer = styled.button`
  background-color: ${themes.primary_btn};
  color: #fff;
  margin: 0 20px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 300;
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
  padding-right: 50px; /* Adjust the right padding as needed */
  border-radius: 8px;
  border: 1px solid black;
  background: url('data:image/svg+xml;utf8,<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')
    no-repeat right 10px center/12px; /* 12px is the size of the arrow icon */
  -webkit-appearance: none; /* Remove default arrow icon */
  -moz-appearance: none;
  appearance: none;
`;

const Table = styled.table`
  margin: 20px 0;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 10px;
  border-radius: 8px;
  padding: 20px;

  &.modalTable {
    overflow: hidden;
    border-radius: 12px;
  }
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
const Tbody = styled.tbody`
  &.modalTableBody {
    background-color: ${themes.table_2};
  }
`;
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
const Button = styled.button`
  background-color: ${themes.secondary_btn};
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  justify-self: end;
`;
