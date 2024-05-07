import React, { useState, useEffect } from 'react';
import image from '../assets/images/logo.png'
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../util/baseurl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const [buttonText, setButtonText] = useState("Submit");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/admin/forgotpassword', {
        token,
        newPassword: password,
        confirmPassword
      });

      if (response) {
        notifySuccess(response.data.message);
        setButtonText("Redirecting...");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }

    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        console.log(errorMessage);
        notifyError(errorMessage);
      } else {
        console.log(error);
        notifyError('An error occurred while updating user');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
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
                  <div className="text-center ">
                    <a href="#"><img className='logoimage w-100' src={image} alt="img" /></a>
                  </div>
                  <h4 className="text-center f-w-500 mt-4 mb-3">Forgot Password</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3 ">
                      <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-primary shadow px-sm-4">{buttonText}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
