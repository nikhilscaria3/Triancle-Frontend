import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { THEME_COLORS as themes } from "../ThemeConfig";
import forgotimage from '../assets/images/login.png';
import logoimage from '../assets/images/logo.png';
import { forgotPasswordRequest } from '../actions/AuthActions';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const VerfiyForgotPassword = ({ usertoken, message, loading, error, forgotPasswordRequest }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await forgotPasswordRequest(formData)
    } catch (error) {
      console.error('ForgotPassword request error:', error);
    }
  };


  return (
    <>
      <ToastContainer />
      <Container>
        <ImagePanel>
          <Image src={forgotimage} alt="ForgotPassword" />
          <Text1>Welcome To</Text1>
          <Text2>LYNTELL</Text2>
        </ImagePanel>
        <FormPanel>
          <Gap>
            <LogoImage src={logoimage} alt="signup" />
          </Gap>

          <Main>
            <Form >
              <Signup>
                <Label htmlFor="email">Email:</Label>
              </Signup>
              <Input
                type="email"
                name="email"
                placeholder='Enter your email'
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <Button type="button" onClick={handleSubmit}>Submit</Button>
              <Gap />
              <Signup>Dont have account? <Link to="/signup">Signup</Link></Signup>
            </Form>
          </Main>
        </FormPanel>
      </Container >
    </>

  );
};

const mapStateToProps = (state) => ({
  usertoken: state.auth.usertoken,
  success: state.auth.success,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps, { forgotPasswordRequest })(VerfiyForgotPassword);

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


const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImagePanel = styled.div`
  width: 50%;
  background-color: #249097;
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
font-size:40px;
  color: white;
  margin-top: 10px; /* Add some spacing between the image and text */
`;

const Text2 = styled.h1`
  color: white;
  margin-top: 10px; /* Add some spacing between the image and text */
`;


const FormPanel = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  align-items: center;
  width:500px;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:400px;
  height:auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #249097;
  color: white;
  border: none;
  width:100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #249097;
  }
`;

const Forgot = styled.p`
  margin-bottom: 20px;
  color:red;
  align-items:flex-end;
`;

const Signup = styled.p`
  margin-top: 20px;
`;

const Gap = styled.div`
  margin-bottom: 20px;
`;

const Div = styled.div`
 display:flex;
 justify-content:space-between;
 border:1px solid;
 width:100%;
 padding:10px;
`;

const Text = styled.p`
font-size:small;
`;