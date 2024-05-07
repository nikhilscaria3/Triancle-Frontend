import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../util/baseurl';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [buttonText, setButtonText] = useState("Submit");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (email && password) {
        const response = await axiosInstance.post('/admin/login', { email, password });
        if (response) {
          const data = response.data;
          console.log(data.message);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userEmail', data.useremail);
          setFormData({ email: '', password: '' });
          setMessage(data.message);
          setButtonText("Redirecting...");
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        setMessage(errorMessage);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  return (
    <div className="auth-main">
      <div className="auth-wrapper v1">
        <div className="auth-form">
          <div className="position-relative my-5">
            <div className="auth-bg">
              <span className="r"></span>
              <span className="r s"></span>
              <span className="r s"></span>
              <span className="r"></span>
            </div>
            <div className="card mb-0">
              <div className="card-body">
                <div className="text-center">
                  <a href="#"><img src="../assets/images/logo-dark.svg" alt="img" /></a>
                </div>
                <h4 className="text-center f-w-500 mt-4 mb-3">Login</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input type="email" className="form-control" id="email" onChange={handleInputChange} placeholder="Email Address" />
                  </div>
                  <div className="form-group mb-3">
                    <input type="password" className="form-control" id="password" onChange={handleInputChange} placeholder="Password" />
                  </div>
                  <div className="d-flex mt-1 justify-content-between align-items-center">
                    <div className="form-check">
                      <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" checked />
                      <label className="form-check-label text-muted" htmlFor="customCheckc1">Remember me?</label>
                    </div>
                    <h6 className="text-secondary f-w-400 mb-0">Forgot Password?</h6>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary shadow px-sm-4">{buttonText}</button>
                  </div>
                </form>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <h6 className="f-w-500 mb-0">Don't have an Account?</h6>
                  <a href="#" className="link-primary">Create Account</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
