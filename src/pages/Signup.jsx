import React, { useState } from 'react';
import styled from 'styled-components';
import { THEME_COLORS as themes } from "../ThemeConfig";
import signupimage from '../assets/images/signup.png';
import logoimage from '../assets/images/logo.png';
import google from '../assets/images/google.png'
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle signup logic here
  };

  return (
    <Container>
      <ImagePanel>
        <Image src={signupimage} alt="signup" />
        <Text1>Welcome To</Text1>
        <Text2>LYNTELL</Text2>
      </ImagePanel>
      <FormPanel>
        <Gap>
          <LogoImage src={logoimage} alt="signup" />
        </Gap>

        <Main>
          <Form>
            <Signup>
              <Label htmlFor="email">Full Name:</Label>
            </Signup>

            <Input
              type="text"
              name="name"
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleInputChange}
            />

            <Label htmlFor="email">Email:</Label>

            <Input
              type="email"
              name="email"
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleInputChange}
            />
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              placeholder='Enter your password'
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Label htmlFor="password">Re-enter Password:</Label>
            <Input
              type="password"
              placeholder='Enter your password'
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
            />

            <Button type="button" onClick={handleSubmit}>Signup</Button>

            <Signup>Dont have account? <Link to="/login" style={{ color: "#249097", fontWeight: "700" }}>Login</Link></Signup>
            <p>Or</p>
            <Gap style={{ width: "100%" }}>
              <Div>
                <img src={google} style={{ width: "25px" }} alt='Google'></img>
                <Text>Signup with Google</Text>
              </Div>

            </Gap>
          </Form>
        </Main>
      </FormPanel>
    </Container >
  );
};


export default SignUp;



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
  width:400px;
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

const Main = styled.form`
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
    background-color: #249096;
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
display: flex;
    justify-content: center;
    border: 1px solid;
    width: 100%;
    gap: 25px;
    padding: 10px;
`;

const Text = styled.p`
font-size:bold;
`;
