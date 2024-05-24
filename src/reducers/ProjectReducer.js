// projectReducer.js

import * as actionTypes from '../actionTypes/ProjectActionTypes';

const initialState = {
    projects: {},
    message: null,
    loading: false,
    error: null
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROJECT_REQUEST:
        case actionTypes.CREATE_PROJECT_REQUEST:
        case actionTypes.UPDATE_PROJECT_REQUEST:
        case actionTypes.DELETE_PROJECT_REQUEST:
            return { ...state, loading: true, error: null };
        case actionTypes.GET_PROJECT_SUCCESS:
            return { ...state, loading: false, projects: action.payload, error: null };
        case actionTypes.CREATE_PROJECT_SUCCESS:
            return { ...state, loading: false, message: action.payload, error: null };
        case actionTypes.UPDATE_PROJECT_SUCCESS:
            return { ...state, loading: false, message: action.payload, error: null };
        case actionTypes.DELETE_PROJECT_SUCCESS:
            return { ...state, loading: false, message: action.payload, error: null };
        case actionTypes.GET_PROJECT_FAILURE:
        case actionTypes.CREATE_PROJECT_FAILURE:
        case actionTypes.UPDATE_PROJECT_FAILURE:
        case actionTypes.DELETE_PROJECT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default projectReducer
