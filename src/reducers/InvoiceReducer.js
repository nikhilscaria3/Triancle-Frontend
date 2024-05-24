// reducers/InvoiceReducer.js

import {
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
} from '../actionTypes/InvoiceActionTypes';

const initialState = {
  invoices: {},
  loading: false,
  error: null,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INVOICE_REQUEST:
    case GET_INVOICES_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_INVOICE_SUCCESS:
      return { ...state, loading: false, error: null };
    case GET_INVOICES_SUCCESS:
      return { ...state, loading: false, invoices: action.payload, error: null };
    case CREATE_INVOICE_FAILURE:
    case GET_INVOICES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default invoiceReducer;
