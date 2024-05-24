import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../../ThemeConfig";

const CreateReportForm = ({ createreportData, updatereportData, newreport, onClose, reportData }) => {

  const [formData, setFormData] = useState({
    id: "",
    recipient: "",
    subject: "",
    message: ""
  });
  const [isedit, setisedit] = useState(false)

  useEffect(() => {
    console.log("formdata", reportData);
    if (reportData) {
      setisedit(true);
      // Add null check before accessing properties
      if (reportData.Role && reportData.Role.roletype) {
        setFormData({
          ...reportData,
          id: reportData.id,
          phoneNumber: reportData.phoneNo,
          accessLevel: reportData.Role.roletype // Set accessLevel to "dummy" if reportData.Role.roletype exists
        });
      } else {
        setFormData({
          ...reportData,
          phoneNumber: reportData.phoneNo,
          accessLevel: null // Set accessLevel to null if reportData.Role.roletype does not exist
        });
      }
    }


    if (newreport) {
      setisedit(false)
      setFormData({
        id: "",
        recipient: "",
        subject: "",
        message: ""
      });
    }

  }, [reportData, newreport]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reportData) {
      console.log("formData", formData);
      // If reportData exists, it means we are editing an existing project
      updatereportData(formData);
    } else {
      // If reportData doesn't exist, it means we are creating a new project
      createreportData(formData);
    }
    onClose(); // Close the form modal
  };


  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Top>
            <Title>{isedit ? "Update report" : "Create report"}</Title>
            <Close onClick={onClose}><i class='bx bx-x' style={{ fontSize: "30px" }}></i></Close>
          </Top>
          <FormContainer>
            <Label htmlFor="recipientemail">Recipient Mail:</Label>
            <Input
              type="text"
              name="recipientemail"
              placeholder="recipient email"
              value={formData.recipientemail}
              onChange={handleChange}
            />
            <Label htmlFor="Subject">Subject:</Label>
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <Label htmlFor="Message">Message:</Label>
            <Textarea
              type="text"
              name="message"
              rows="15"
              cols="10"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            />
            <Buttons>
              <CancelBtn onClick={onClose}>Cancel</CancelBtn>
              {isedit ?
                <CreateBtn type="submit">Update</CreateBtn>
                :
                <CreateBtn type="submit">Create</CreateBtn>
              }
            </Buttons>
          </FormContainer>
        </Form>

      </Container>
    </div>
  );
};

export default CreateReportForm;

const Container = styled.div`
  margin: 60px auto;
  z-index: 999;
  //glassmorphism effect
`;
const Form = styled.form``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 35px;
  border-bottom: 1px solid #74747454;
  background-color: white;
  border-radius: 20px 20px 0 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
  font-weight: bold;
`;


const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const Close = styled.p`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;
const FormContainer = styled.div`
padding: 10px 40px;
background-color: #e0edea;
border-radius: 0 0 20px 20px;
height: 700px; /* Adjust height as needed */
width: 700px; /* Adjust width as needed */
overflow-y: scroll; /* Add vertical scroll if content exceeds height */
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  background-color: #ffff;
  margin: 10px 0;
  border-radius: 9px;
  overflow:scroll;
  font-size: 15px;

  &::placeholder {
    font-size: 15px;
    color: ${themes.text_9};
    font-weight: 275;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;

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

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
const CancelBtn = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: transparent;
  border-radius: 5px;
  color: #595959;
`;
const CreateBtn = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #009432;
  color: #fff;
  border-radius: 5px;
`;
