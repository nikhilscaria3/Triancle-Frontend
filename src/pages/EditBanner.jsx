import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../ThemeConfig";
import { axiosInstance } from "../utils/baseurl";
import { showNotification } from "../utils/toastmessage";
import { ToastContainer } from "react-toastify";
import config from "../utils/config";
import ImageCarousel from "../components/includes/caroUsel";

const Editbanner = () => {
  const [Edits, setEdits] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    startDate: "",
    endDate: ""
  });


  useEffect(() => {
    fetchEdits();
  }, []);

  const fetchEdits = async () => {
    try {
      const response = await axiosInstance.get("/banner/getbanner");
      setEdits(response.data.bannerdata);
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




  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEdits([...Edits, file]);
    }
  };

  const handleViewEdit = (edit) => {
    setSelectedEdit(edit);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEdit(null);
    setShowModal(false);
  };

  return (
    <div>
      <ToastContainer />
      <AddEditContainer>

        <AddEditButton>
          <Input
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(event) => handleInputChange(event, "title")}
          />
          <Input
            type="text"
            placeholder="Enter description"
            value={formData.description}
            onChange={(event) => handleInputChange(event, "description")}
          />

          <Input
            type="date"
            placeholder="Enter start date"
            value={formData.startDate}
            onChange={(event) => handleInputChange(event, "startDate")}
          />
          <Input
            type="date"
            placeholder="Enter end date"
            value={formData.endDate}
            onChange={(event) => handleInputChange(event, "endDate")}
          />
          <Input type="file" onChange={handleFileUpload} />
          <Button type="submit">Save</Button>
        </AddEditButton>
      </AddEditContainer>
      <ImageCarousel images={Edits.map((edit) => edit.imageUrl)} />
      <Container>
        <h1>Edit Banner</h1>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
              <Th>Image</Th>
              <Th>Settings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Edits && Edits.length > 0 ? (
              Edits.map((item) => (
                <Tr key={item.id}>

                  <Td>{item.title}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.startDate}</Td>
                  <Td>{item.endDate}</Td>
                  <Td><img className="" style={{ width: "50px", objectFit: "cover" }} src={item.imageUrl}></img></Td>
                  <Td>
                    <Btn style={{ color: "Blue" }} onClick={() => handleViewEdit(item)}>View</Btn>
                    <Btn style={{ color: "Red" }} onClick={() => handleDownload(item.imageUrl)}>Download</Btn>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="10">No Banner Available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Container>
      {showModal && (
        <Modal>
          <ModalContent>
            <Top>
              <h3>{selectedEdit.title}</h3>
              <Close onClick={handleCloseModal}><i class='bx bx-x' style={{ fontSize: "30px" }}></i></Close>
            </Top>

            <p>{selectedEdit.description}</p>
            <img className="" src={selectedEdit.imageUrl}></img>
            {/* Additional content of the modal */}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Editbanner;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Top = styled.div`
display: flex;
    justify-content: space-between;
    align-items: end;
    padding: 17px 1px;
    border-bottom: 1px solid #74747454;
    background-color: white;
    border-radius: 20px 20px 0 0;

`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  background-color: #ffff;
  margin: 10px 0;
  border-radius: 9px;
  font-size: 15px;

  &::placeholder {
    font-size: 15px;
    color: ${themes.text_9};
    font-weight: 275;
  }
`;

// const Button = styled.button`
//   padding: 0.5rem 1rem;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #3e8e41;
//   }
// `;


const AddEditContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AddEditButton = styled.form`
  margin: auto;
  display:flex;
  gap:10px;
  width:100%;
  flex-direction: row;
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

const Close = styled.p`
  height: 20px;
  width: 20px;
  cursor: pointer;
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


const Modal = styled.div`
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
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;