import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../../ThemeConfig";
import config from "../../../utils/config";
import { connect } from 'react-redux';
import { fetchUsers } from "../../../actions/UserActions";

const CreateProjectForm = ({ users, count, createProjectData, updateProjectData, newproject, fetchUsers, onClose, projectData }) => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    name: "",
    projectId: "",
    location: "",
    halted: false,
    startDate: "",
    endDate: "",
    percentageCompleted: 0,
    projectHeadId: ""
  });
  const [isedit, setisedit] = useState(false)

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
    console.log("projectData", projectData);
    if (projectData) {
      setisedit(true);
      const selectedProjectHead = users.data.find(project => project.id === projectData.UserId);
      if (selectedProjectHead) { // Add null check
        setFormData({
          id: projectData.id,
          type: projectData.type,
          name: projectData.name,
          halted: projectData.halted,
          projectId: projectData.projectId,
          location: projectData.location,
          startDate: projectData.startDate,
          endDate: projectData.endDate,
          percentageCompleted: projectData.percentageCompleted || 0,
          projectHeadId: projectData.UserId
        });

        setFormData({
          ...formData,
          ...projectData,
          halted: false,
          projectHeadId: projectData.UserId
        })
      }
    }


    if (newproject) {
      setisedit(false)
      setFormData({
        id: "",
        type: "",
        name: "",
        projectId: count + 1,
        location: "",
        startDate: "",
        endDate: "",
        percentageCompleted: 0,
        projectHeadId: ""
      });
    }


  }, [fetchUsers, projectData, newproject]);


  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    // const selectedProject = users.find(project => project.id === selectedUserId);
    setFormData({ ...formData, projectHeadId: selectedUserId });
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'number' && name === 'percentageCompleted') {
      // Ensure the entered value is within the range 0-100
      newValue = Math.min(Math.max(parseInt(value), 0), 100);
    } else {
      const newValue = name === "halted" ? checked : value;
      // Update the state with the new value
      setFormData({ ...formData, [name]: newValue });
    }

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectData) {
      // If projectData exists, it means we are editing an existing project
      updateProjectData(formData);
    } else {
      // If projectData doesn't exist, it means we are creating a new project
      createProjectData(formData);
    }
    onClose(); // Close the form modal
  };

  console.log(formData);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Top>
          <Title>{isedit ? "Update project" : "Create project"}</Title>
          <Close onClick={onClose}><i class='bx bx-x' style={{ fontSize: "30px" }}></i></Close>
        </Top>
        <FormContainer>
          <Label htmlFor="projectId">Project ID:</Label>
          <Input
            type="text"
            name="projectId"
            id="projectId"
            disabled
            placeholder="Project ID"
            value={`${config.settings.projectprefix} ${formData.projectId}`}
            onChange={handleChange}
            required
          />

          <Label htmlFor="type">Type:</Label>
          <Select
            name="type"
            onChange={handleChange}
            value={formData.type ? formData.type : "con"}
            required
          >
            <option value="">Select Type</option>
            {config.settings.availableTypes && config.settings.availableTypes.length > 0 ? (
              config.settings.availableTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))
            ) : (
              <option disabled>No Types available</option>
            )}
          </Select>


          <Label htmlFor="halted">Halted:</Label>
          <Input
            type="checkbox"
            name="halted"
            id="halted"
            checked={formData.halted} // Use checked instead of value for checkboxes
            onChange={handleChange}

          />

          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />



          <Label htmlFor="location">Location:</Label>
          <Input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <Label htmlFor="startDate">Start Date:</Label>
          <Input
            type="date"
            name="startDate"
            id="startDate"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <Label htmlFor="endDate">End Date:</Label>
          <Input
            type="date"
            name="endDate"
            id="endDate"
            placeholder="End Date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          <Label htmlFor="percentageCompleted">% Completed:</Label>
          <Input
            type="number"
            name="percentageCompleted"
            id="percentageCompleted"
            placeholder="% Completed"
            value={formData.percentageCompleted}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Label htmlFor="projectHeadId">Project Head:</Label>
          <Select
            name="projectHeadId"
            id="projectHeadId"
            onChange={handleUserChange}
            value={formData.projectHeadId} // Set the value attribute to formData.projectHeadId
            required
          >
            <option >Select</option>
            {users.data && users.data.length > 0 ? (
              users.data
                .filter(user => user.status)
                .map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))
            ) : (
              <option disabled>No project manager available</option>
            )}

          </Select>

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

  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  loading: state.user.loading,
  error: state.user.error
});


export default connect(mapStateToProps, { fetchUsers })(CreateProjectForm);

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
  width: 700px; /* Adjust width as needed */
  height:600px;
  overflow-y: scroll; /* Add vertical scroll if content exceeds height */
  background-color: #e0edea;
  border-radius: 0 0 20px 20px;
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
const SelectContainer = styled.div``;
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
