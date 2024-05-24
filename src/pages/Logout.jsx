import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions (clear authentication tokens, reset state, etc.)
    // Remove the token from local storage
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </>
  );
};

const LogoutButton = styled.button`
  background-color: #f00;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d00;
  }
`;

export default Logout;
