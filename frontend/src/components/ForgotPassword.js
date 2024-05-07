import React, { useState } from 'react';
import image from '../assets/images/logo.png'
import { axiosInstance } from '../util/baseurl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/admin/verifyforgotmail', { email });
      notifySuccess(response.data.message);
      setEmail("")
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        console.log(errorMessage);
        notifyError(errorMessage);
      } else {
        console.log(error);
        notifyError('An error occurred while creating user');
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
                    <div className="form-group mb-3">
                      <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                    </div>
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-primary shadow px-sm-4">Submit</button>
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

export default ForgotPassword;
