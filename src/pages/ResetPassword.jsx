import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { THEME_COLORS as themes } from "../ThemeConfig";
import { resetPasswordRequest } from "../actions/AuthActions";
import { ToastContainer } from "react-toastify";
import Key from "../assets/icons/key.png";
const ResetPassword = ({ resetPasswordRequest }) => {
  const token = localStorage.getItem("accesstoken");
  const [ButtonText, setButtonText] = useState("Reset");

  const [formData, setFormData] = useState({
    token: token,
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await resetPasswordRequest(formData);
      setFormData("");
    } catch (error) {
      console.error("ResetPassword request error:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <FormPanel>
          <Main>
            <Form>
              <Heading>Create a new Password</Heading>
              <IconContainer>
                <KeyIcon>
                  <Icon src={Key} alt="password Reset" />
                </KeyIcon>
              </IconContainer>
              <Signup>
                <Label htmlFor="email">New Password:</Label>
              </Signup>
              <Input
                type="password"
                name="currentpassword"
                placeholder="Current Password"
                required
                value={formData.currentpassword}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="newpassword"
                placeholder="New Password"
                required
                value={formData.newpassword}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmpassword}
                onChange={handleInputChange}
              />
              <Button type="button" onClick={handleSubmit}>
                {ButtonText}
              </Button>
              <Gap />
            </Form>
          </Main>
        </FormPanel>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  usertoken: state.auth.usertoken,
  resetSuccess: state.auth.resetSuccess,
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, { resetPasswordRequest })(
  ResetPassword
);

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
`;
const Heading = styled.h2`
  font-size: 32px;
  font-family: "Poppins";
  font-weight: 500;
  color: ${themes.text_2};
  text-align: center;
`;
const Container = styled.div`
  display: grid;
  height: 90vh;
  place-content: center;
`;
const IconContainer = styled.div`
  display: grid;
  justify-items: center;
  margin: 10px 0;
`;
const KeyIcon = styled.div`
  height: 80px;
  width: 80px;
  padding: 20px;
  border: 1px solid ${themes.border_1};
  border-radius: 8px;
`;
const Icon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  filter: invert(70%);
`;
const ImagePanel = styled.div`
  width: 50%;
  background-color: #1a6a89;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align content vertically */
  align-items: center; /* Align content horizontally */
`;

const Image = styled.img`
  width: 500px;
`;

const LogoImage = styled.img`
  width: 100%;
`;

const Text1 = styled.p`
  font-size: 40px;
  color: white;
  margin-top: 10px; /* Add some spacing between the image and text */
`;

const Text2 = styled.h1`
  color: white;
  margin-top: 10px; /* Add some spacing between the image and text */
`;

const FormPanel = styled.div`
  width: 80%;
  padding: 20px;
`;

const Main = styled.div``;

const Form = styled.form`
  background-color: ${themes.notification};
  padding: 40px;
  border-radius: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
  color: ${themes.text_2};
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  background-color: ${themes.notification};
  margin: 10px 0;
  border-radius: 9px;
  font-size: 15px;
  border-bottom: 1px solid ${themes.border_1};
  box-shadow: 2px 1px 3px 0px ${themes.border_4};
  color: ${themes.text_2};

  &::placeholder {
    font-size: 15px;
    color: ${themes.text_2};
    font-weight: 275;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${themes.primary_btn};
  color: white;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${themes.notification_message};
    color: ${themes.notification};
  }
`;

const Forgot = styled.p`
  margin-bottom: 20px;
  color: red;
  align-items: flex-end;
`;

const Signup = styled.p`
  margin-top: 20px;
`;

const Gap = styled.div`
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  width: 100%;
  padding: 10px;
`;

const Text = styled.p`
  font-size: small;
`;
