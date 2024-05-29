// actions/ChecklistActions.js

import axios from 'axios';
import {
  FETCH_CHECKLIST_REQUEST,
  FETCH_CHECKLIST_SUCCESS,
  FETCH_CHECKLIST_FAILURE,
  EXPORT_CHECKLIST_REQUEST,
  EXPORT_CHECKLIST_SUCCESS,
  EXPORT_CHECKLIST_FAILURE,
} from '../actionTypes/ChecklistActionTypes';
import { axiosInstance } from '../utils/baseurl';


export const fetchChecklist = (page, limit, searchTerm, sortBy, sortOrder) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHECKLIST_REQUEST });
    try {
      const response = await axiosInstance.get(`/checklist/getchecklist?page=${page}&limit=${limit}`, {
        params: {
          searchTerm,
          sortBy,
          sortOrder
        }
      });
      console.log(response.data);
      dispatch({ type: FETCH_CHECKLIST_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: FETCH_CHECKLIST_FAILURE, payload: error.response.data });
    }
  }
};

export const exportChecklist = (format) => {
  return async (dispatch) => {
    dispatch({ type: EXPORT_CHECKLIST_REQUEST });
    try {
      const response = await axiosInstance.get('/checklist/exportchecklist', {
        headers: {
          "Content-Type": `application/json`
        },
        params: {
          format
        },
        responseType: 'arraybuffer'
      });

      console.log(response.data);
      // Handle the exported data as needed
      dispatch({ type: EXPORT_CHECKLIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: EXPORT_CHECKLIST_FAILURE, payload: error.response.data });
    }
  }
};
