// reducers/UserReducer.js

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
  // Define other action types similarly
} from '../actionTypes/UserActionTypes';

const initialState = {
  users: [],
  message: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // Handle other action types similarly
    default:
      return state;
  }
};

export default userReducer;
