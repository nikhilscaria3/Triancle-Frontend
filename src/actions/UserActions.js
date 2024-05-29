// actions/UserActions.js


import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from '../actionTypes/UserActionTypes';
import { axiosInstance } from '../utils/baseurl';
import { showNotification } from '../utils/toastmessage';

// actions/UserActions.js

// Fetch users action creators
export const fetchUsers = (page, limit, searchTerm, sortBy, sortOrder) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response = await axiosInstance.get(`/user/getuser?page=${page}&limit=${limit}`, {
        params: {
          searchTerm, sortBy, sortOrder
        }
      }
      );
      const users = await response.data;
      console.log(users);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: users, message: response.data.message });
      return projects;
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        dispatch({ type: FETCH_USERS_FAILURE, payload: errorMessage });
      } else {
        console.log(error);
        dispatch({ type: FETCH_USERS_FAILURE, payload: 'An error occurred while fetching user' });
      }
    }
  }
};


// Create user action creators
export const createUser = (formData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    try {
      const response = await axiosInstance.post('/user/createuser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
      dispatch({ type: CREATE_USER_SUCCESS, payload: response.data.message });
      showNotification({ type: "SUCCESS", message: response.data.message });
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        dispatch({ type: CREATE_USER_FAILURE, payload: errorMessage });
        showNotification({ type: "ERROR", message: errorMessage });
      } else {
        console.log(error);
        dispatch({ type: CREATE_USER_FAILURE, payload: 'An error occurred while creating user' });
      }
    }
  }
};

// Update user action creators
export const updateUser = (formData) => {

  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      console.log(formData);
      const response = await axiosInstance.put('/user/updateuser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data.message });
      showNotification({ type: "SUCCESS", message: response.data.message });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        dispatch({ type: UPDATE_USER_FAILURE, payload: errorMessage });
        showNotification({ type: "ERROR", message: errorMessage });
      } else {
        console.log(error);
        dispatch({ type: UPDATE_USER_FAILURE, payload: 'An error occurred while updating user' });
      }
    }
  }
};

// Delete user action creators
export const deleteUser = (storedID) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      const response = await axiosInstance.delete('/user/deleteuser', {
        params: {
          storedID
        }
      });
      dispatch({ type: DELETE_USER_SUCCESS, payload: response.data.message });
      showNotification({ type: "SUCCESS", message: response.data.message });
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        dispatch({ type: DELETE_USER_FAILURE, payload: errorMessage });
        showNotification({ type: "ERROR", message: errorMessage });
      } else {
        console.log(error);
        dispatch({ type: DELETE_USER_FAILURE, payload: 'An error occurred while updating user' });
      }
    }
  }
};

