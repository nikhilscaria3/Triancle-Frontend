// reducers/InvoiceReducer.js

import {
    GET_MATERIALTYPE_REQUEST,
    GET_MATERIALTYPE_SUCCESS,
    GET_MATERIALTYPE_FAILURE,
    GET_MATERIAL_REQUEST,
    GET_MATERIAL_SUCCESS,
    GET_MATERIAL_FAILURE,
    CREATE_MATERIAL_REQUEST,
    CREATE_MATERIAL_SUCCESS,
    CREATE_MATERIAL_FAILURE,
    UPDATE_MATERIAL_REQUEST,
    UPDATE_MATERIAL_SUCCESS,
    UPDATE_MATERIAL_FAILURE,
    GET_MATERIALREQUEST_SUCCESS,
    GET_MATERIALREQUEST_FAILURE,
    GET_MATERIALREQUEST_REQUEST,
    UPDATE_MATERIALREQUEST_REQUEST,
    UPDATE_MATERIALREQUEST_SUCCESS,
    UPDATE_MATERIALREQUEST_FAILURE,
    DELETE_MATERIAL_REQUEST,
    DELETE_MATERIAL_SUCCESS,
    DELETE_MATERIAL_FAILURE,

} from '../actionTypes/MaterialTypes';


const initialState = {
    materialrequest: {},
    materialtype: {},
    material: {}, // <-- This is an object
    loading: false,
    error: null,
};


const materialReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MATERIAL_REQUEST:
        case GET_MATERIAL_REQUEST:
        case GET_MATERIALTYPE_REQUEST:
        case GET_MATERIALREQUEST_REQUEST:
        case UPDATE_MATERIAL_REQUEST:
        case UPDATE_MATERIALREQUEST_REQUEST:
        case DELETE_MATERIAL_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_MATERIAL_SUCCESS:
        case GET_MATERIALTYPE_SUCCESS:
        case UPDATE_MATERIAL_SUCCESS:
        case UPDATE_MATERIALREQUEST_SUCCESS:
        case DELETE_MATERIAL_SUCCESS:
            return { ...state, loading: false, materialtype: action.payload, error: null };
        case GET_MATERIAL_SUCCESS:
            console.log(action.payload);
            return { ...state, loading: false, material: action.payload, error: null };
        case GET_MATERIALREQUEST_SUCCESS:
            console.log(action.payload);
            return { ...state, loading: false, materialrequest: action.payload, error: null };

        case CREATE_MATERIAL_FAILURE:
        case GET_MATERIAL_FAILURE:
        case GET_MATERIALTYPE_FAILURE:
        case UPDATE_MATERIAL_FAILURE:
        case GET_MATERIALREQUEST_FAILURE:
        case UPDATE_MATERIALREQUEST_FAILURE:
        case DELETE_MATERIAL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default materialReducer;
