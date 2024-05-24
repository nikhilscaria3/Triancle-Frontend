import React from "react";
import styled from "styled-components";

import { THEME_COLORS as themes } from "../../ThemeConfig";
import square from "../../assets/icons/squareprofile.svg";
import UserCurrProjTable from "../screens/tables/UserCurrProjTable";
import UserPrevProjTable from "../screens/tables/UserPrevProjTable";
import { useLocation } from "react-router-dom";


const UserDetails = () => {

  const location = useLocation();
  const userData = location.state;

  const currentProjects = userData?.projects.filter(
    (project) => project.percentageCompleted !== 100
  );
  const previousProjects = userData?.projects.filter(
    (project) => project.percentageCompleted === 100
  );


  return (
    <div>
      <TopContainer>
        {userData ? (
          <>
            <Top>
              <Left>
                <Img src={userData.image} alt="user" />
              </Left>
              <Right>
                <List>
                  <Topic>Name</Topic>
                  <Sep>:</Sep>
                  <Value>{userData.name}</Value>
                </List>
                <List>
                  <Topic>Job Role</Topic>
                  <Sep>:</Sep>
                  <Value>{userData.jobRole}</Value>
                </List>
                <List>
                  <Topic>Add On Date</Topic>
                  <Sep>:</Sep>
                  <Value>{userData.joinDate}</Value>
                </List>
                <List>
                  <Topic>ID Number</Topic>
                  <Sep>:</Sep>
                  <Value>{userData.idNumber}</Value>
                </List>
              </Right>
            </Top>
            <Bottom>
              <List>
                <Topic>Email ID</Topic>
                <Sep>:</Sep>
                <Value>{userData.email}</Value>
              </List>
              <List>
                <Topic>Phone Number</Topic>
                <Sep>:</Sep>
                <Value>{userData.phoneNo}</Value>
              </List>
              <List>
                <Topic>Blood Group</Topic>
                <Sep>:</Sep>
                <Value>{userData.bloodGroup}</Value>
              </List>
            </Bottom>
          </>
        ) : (
          <NotFound>
            <Title> Data Not Found</Title>
          </NotFound>
        )}
        {/* <Top>
          <Left>
            <Img src={square} alt="user" />
          </Left>
          <Right>
            <List>
              <Topic>Name</Topic>
              <Sep>:</Sep>
              <Value>Rahul C Narayanan</Value>
            </List>
            <List>
              <Topic>Job Role</Topic>
              <Sep>:</Sep>
              <Value>Site Supervisor</Value>
            </List>
            <List>
              <Topic>Add On Date</Topic>
              <Sep>:</Sep>
              <Value>02/15/24</Value>
            </List>
            <List>
              <Topic>ID Number</Topic>
              <Sep>:</Sep>
              <Value>8965</Value>
            </List>
          </Right>
        </Top>
        <Bottom>
          <BottomList>
            <Topic>Email ID</Topic>
            <Sep>:</Sep>
            <Value>rahulcn@gmail.com</Value>
          </BottomList>
          <BottomList>
            <Topic>Phone Number</Topic>
            <Sep>:</Sep>
            <Value>9865326598</Value>
          </BottomList>
          <BottomList>
            <Topic>Blood Group</Topic>
            <Sep>:</Sep>
            <Value>B+</Value>
          </BottomList>
        </Bottom> */}
      </TopContainer>
      <BottomContainer>
        <UserCurrProjTable currentproject={currentProjects} />
        <UserPrevProjTable previousProjects={previousProjects} />
      </BottomContainer>
    </div>
  );
};

export default UserDetails;

const TopContainer = styled.div`
  background-color: ${themes.background_4};
  margin: 20px auto;
  width: 70%;
`;

const NotFound = styled.div`
    background-color: #ffe6e6;
    padding: 20px;
    border-radius: 5px;
`;

const Title = styled.h1`
    margin-bottom: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 120px;
  align-items: center;
  margin: 0 80px;
  border-bottom: 1px solid ${themes.black};
`;
const Left = styled.div`
  height: 150px;
  width: 120px;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  display: inline-block;
  object-fit: cover;
`;
const Right = styled.ul``;
const List = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 0;
`;
const Topic = styled.p`
  font-weight: 500;
`;
const Sep = styled.div`
  font-weight: 500;
`;
const Value = styled.p`
  font-weight: 300;
`;
const Bottom = styled.div`
  // display: flex;
  // justify-content: space-between;
  margin: 0 80px;
`;
const BottomList = styled.li`
  display: flex;
  padding: 10px 0;
  gap: 10px;
`;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
