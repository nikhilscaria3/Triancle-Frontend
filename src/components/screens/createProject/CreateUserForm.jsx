import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../../ThemeConfig";

const CreateUserForm = ({ createUserData, updateUserData, newuser, onClose, userData }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    jobRole: "",
    accessLevel: "",
    phoneNumber: "",
    status: "",
    joinDate: "",
    idNumber: "",
    bloodGroup: "",
    password: "",
    organizationId: "",
    image: null
  });
  const [isedit, setisedit] = useState(false)

  useEffect(() => {
    console.log("formdata", userData);
    if (userData) {
      setisedit(true);
      // Add null check before accessing properties
      if (userData.Role && userData.Role.roletype) {
        setFormData({
          ...userData,
          id: userData.id,
          phoneNumber: userData.phoneNo,
          accessLevel: userData.Role.roletype // Set accessLevel to "dummy" if userData.Role.roletype exists
        });
      } else {
        setFormData({
          ...userData,
          phoneNumber: userData.phoneNo,
          accessLevel: null // Set accessLevel to null if userData.Role.roletype does not exist
        });
      }
    }


    if (newuser) {
      setisedit(false)
      setFormData({
        id: "",
        name: "",
        email: "",
        jobRole: "",
        accessLevel: "",
        phoneNumber: "",
        status: "",
        joinDate: "",
        idNumber: "",
        bloodGroup: "",
        password: "",
        organizationId: "",
        image: null
      });
    }

  }, [userData, newuser]);



  const handleImageFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData) {
      console.log("formData", formData);
      // If userData exists, it means we are editing an existing project
      updateUserData(formData);
    } else {
      // If userData doesn't exist, it means we are creating a new project
      createUserData(formData);
    }
    onClose(); // Close the form modal
  };


  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Top>
            <Title>{isedit ? "Update user" : "Create user"}</Title>
            <Close onClick={onClose}><i class='bx bx-x' style={{ fontSize: "30px" }}></i></Close>
          </Top>
          <FormContainer>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Label htmlFor="jobRole">Job Role:</Label>
            <Input
              type="text"
              name="jobRole"
              placeholder="Job Role"
              value={formData.jobRole}
              onChange={handleChange}
            />
            <Label htmlFor="accessLevel">Access Level:</Label>
            <Input
              type="text"
              name="accessLevel"
              placeholder="Access Level"
              value={formData.accessLevel}
              onChange={handleChange}
            />
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Label htmlFor="status">Status:</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
            <Label htmlFor="joinDate">Join Date:</Label>
            <Input
              type="date"
              name="joinDate"
              placeholder="Join Date"
              value={formData.joinDate}
              onChange={handleChange}
            />
            <Label htmlFor="idNumber">ID Number:</Label>
            <Input
              type="text"
              name="idNumber"
              placeholder="ID Number"
              value={formData.idNumber}
              onChange={handleChange}
            />
            <Label htmlFor="bloodGroup">Blood Group:</Label>
            <Select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Label htmlFor="organizationId">Organization ID:</Label>
            <Input
              type="text"
              name="organizationId"
              placeholder="Organization ID"
              value={formData.organizationId}
              onChange={handleChange}
            />
            <Label htmlFor="image">Image:</Label>
            <Input
              type="file"
              name="image"
              placeholder="Image"
              onChange={handleImageFileChange}
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

export default CreateUserForm;

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
