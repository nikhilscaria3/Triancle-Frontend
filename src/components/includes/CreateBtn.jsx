import React from "react";
import addBtn from "../../assets/icons/add.svg";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";

const CreateBtn = ({ text, onClick }) => {
  return (
    <div>
      <NewProject onClick={onClick}>
        <IconContainer>
          <Icon src={addBtn} alt="create new project" />
        </IconContainer>
        <Text>{text}</Text>
      </NewProject>
    </div>
  );
};

export default CreateBtn;
const NewProject = styled.div`
  background-color: ${themes.primary_btn};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 4px 10px;
  cursor: pointer;
`;
const IconContainer = styled.div`
  height: 28px;
  width: 28px;
`;
const Icon = styled.img`
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  object-fit: cover;
`;
const Text = styled.p`
  color: white;
`;
