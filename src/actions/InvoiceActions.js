// actions/InvoiceActions.js

import axios from 'axios';
import {
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
} from '../actionTypes/InvoiceActionTypes';
import { axiosInstance } from '../utils/baseurl';

export const createInvoice = (invoiceData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INVOICE_REQUEST });
    try {
      const response = await axiosInstance.post('/invoices/createinvoice', invoiceData);
      dispatch({ type: CREATE_INVOICE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_INVOICE_FAILURE, payload: error.response.data });
    }
  }
};

export const getInvoices = (page, limit, searchTerm, sortBy, sortOrder) => {
  return async (dispatch) => {
    dispatch({ type: GET_INVOICES_REQUEST });
    try {
      const response = await axiosInstance.get(`/invoices/getinvoices?page=${page}&limit=${limit}`, {
        params: {
          searchTerm,
          sortBy,
          sortOrder
        }
      });
      if (response.data) {
        dispatch({ type: GET_INVOICES_SUCCESS, payload: response.data });
        console.log(response.data); // Log the entire response object
      } else {
        throw new Error('Response data is undefined');
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      dispatch({ type: GET_INVOICES_FAILURE, payload: error.response ? error.response.data : 'Unknown error' });
    }
  }
};
