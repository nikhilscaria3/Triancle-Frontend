import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const UserProfile = () => {
  const location = useLocation();
  const userData = location.state;

  const currentProjects = userData?.projects.filter(
    (project) => project.percentageCompleted !== 100
  );
  const previousProjects = userData?.projects.filter(
    (project) => project.percentageCompleted === 100
  );

  return (
    <Container>
      {userData ? (
        <div>
          <ProfileInfo>
            <SectionTitle>User Information</SectionTitle>
            <img style={{ width: "200px" }} src={userData.image}></img>
            <Info>Email: {userData.email}</Info>
            <Info>ID: {userData.idNumber}</Info>
            <Info>Job Role: {userData.jobRole}</Info>
            <Info>Access: {userData.Role.roletype}</Info>
            <Info>Phone Number: {userData.phoneNo}</Info>
            <Info>Blood Group: {userData.bloodGroup}</Info>
            <Info>Join Date: {userData.joinDate}</Info>
            <Info>Status: {userData.status ? "True" : "False"}</Info>
          </ProfileInfo>

          {currentProjects.length > 0 && (
            <ProfileInfo>
              <SectionTitle>Current Projects</SectionTitle>
              <ProjectList>
                {currentProjects.map((projectData) => (
                  <ProjectItem key={projectData.id}>
                    <ProjectName>
                      {projectData.name} : {projectData.startDate}
                    </ProjectName>
                    <ProjectStatus>{projectData.completed}</ProjectStatus>
                  </ProjectItem>
                ))}
              </ProjectList>
            </ProfileInfo>
          )}

          {previousProjects.length > 0 && (
            <ProfileInfo>
              <SectionTitle>Previous Projects</SectionTitle>
              <ProjectList>
                {previousProjects.map((projectData) => (
                  <ProjectItem key={projectData.id}>
                    <ProjectName>
                      {projectData.name} : {projectData.endDate}
                    </ProjectName>
                    <ProjectStatus>{projectData.completed}</ProjectStatus>
                  </ProjectItem>
                ))}
              </ProjectList>
            </ProfileInfo>
          )}
        </div>
      ) : (
        <NotFound>
          <Title>Profile Data Not Found</Title>
          <Message>Please navigate to the profile page with user data.</Message>
        </NotFound>
      )}
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  margin: 20px;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const SubTitle = styled.p``;

const ProfileInfo = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin-bottom: 5px;
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`;

const ProjectItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
`;

const ProjectName = styled.p`
  font-weight: bold;
`;

const ProjectStatus = styled.span`
  color: ${({ completed }) => (completed ? "#00cc00" : "#ff3300")};
  font-weight: bold;
`;

const NotFound = styled.div`
  background-color: #ffe6e6;
  padding: 20px;
  border-radius: 5px;
`;

const Message = styled.p``;
