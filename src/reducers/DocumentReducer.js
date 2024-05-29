// reducers/DocumentReducer.js

import {
  CREATE_DOCUMENT_REQUEST,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILURE,
  GET_DOCUMENT_REQUEST,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_REQUEST,
  UPDATE_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_REQUEST,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
} from '../actionTypes/DocumentTypes';

const initialState = {
  documents: {},
  loading: false,
  error: null,
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOCUMENT_REQUEST:
    case GET_DOCUMENT_REQUEST:
    case UPDATE_DOCUMENT_REQUEST:
    case DELETE_DOCUMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_DOCUMENT_SUCCESS:
    case UPDATE_DOCUMENT_SUCCESS:
    case DELETE_DOCUMENT_SUCCESS:
      return { ...state, loading: false, error: null };
    case GET_DOCUMENT_SUCCESS:
      return { ...state, loading: false, documents: action.payload, error: null };
    case CREATE_DOCUMENT_FAILURE:
    case GET_DOCUMENT_FAILURE:
    case UPDATE_DOCUMENT_FAILURE:
    case DELETE_DOCUMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default documentReducer;
