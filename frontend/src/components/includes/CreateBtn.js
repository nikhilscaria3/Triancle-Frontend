import React from "react";
import addBtn from "../../assets/icons/add.svg";
import styled from "styled-components";
import { THEME_COLORS as themes } from "../../ThemeConfig";

const CreateBtn = ({ text }) => {
  return (
    <div>
      <NewProject>
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
  position: relative;
  border-radius: 5px;
  padding: 20px 100px;
  cursor: pointer;
`;
const IconContainer = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;
const Icon = styled.img`
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  object-fit: cover;
`;
const Text = styled.p`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: white;
`;
