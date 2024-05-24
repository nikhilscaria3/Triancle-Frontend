// reducers/ChecklistReducer.js

import {
  FETCH_CHECKLIST_REQUEST,
  FETCH_CHECKLIST_SUCCESS,
  FETCH_CHECKLIST_FAILURE,
  EXPORT_CHECKLIST_REQUEST,
  EXPORT_CHECKLIST_SUCCESS,
  EXPORT_CHECKLIST_FAILURE,
} from '../actionTypes/ChecklistActionTypes';

const initialState = {
  checklists: [],
  bufferdata: null,
  loading: false,
  error: null,
};

const checklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHECKLIST_REQUEST:
    case EXPORT_CHECKLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHECKLIST_SUCCESS:
      return { ...state, loading: false, checklists: action.payload, error: null };
    case EXPORT_CHECKLIST_SUCCESS:
      return { ...state, loading: false, bufferdata: action.payload, error: null };
    case FETCH_CHECKLIST_FAILURE:
    case EXPORT_CHECKLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default checklistReducer;
