// actions.js
import axios from 'axios';
import * as actionTypes from '../actionTypes/AuthTypes';
import { axiosInstance } from '../utils/baseurl';
import { showNotification } from '../utils/toastmessage';

// Action creators
export const signupRequest = (userData) => async (dispatch) => {
    dispatch({ type: actionTypes.SIGNUP_REQUEST });
    try {
        const response = await axios.post('/api/signup', userData);
        dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.SIGNUP_FAILURE, payload: error.response.data });
    }
};

export const loginRequest = (formData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.LOGIN_REQUEST });
        try {
            const response = await axiosInstance.post('/admin/login', formData);
            dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.data.data });
            console.log(response.data.data);
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: actionTypes.LOGIN_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: actionTypes.LOGIN_FAILURE, payload: 'An error occurred while creating project' });
            }
        }
    };
};

export const forgotPasswordRequest = (email) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FORGOT_PASSWORD_REQUEST });
        try {
            const response = await axiosInstance.post('/admin/verifyforgotmail', { email });
            dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS });
            console.log(response.data);
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: actionTypes.FORGOT_PASSWORD_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: actionTypes.FORGOT_PASSWORD_FAILURE, payload: 'An error occurred while creating project' });
            }
        }
    };
};


export const resetPasswordRequest = (formData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });
        try {
            const response = await axiosInstance.post('/admin/forgotpassword', formData);
            dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS  , payload: response.data.success});
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: actionTypes.RESET_PASSWORD_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: actionTypes.RESET_PASSWORD_FAILURE, payload: 'An error occurred while creating project' });
            }
        }
    };
};