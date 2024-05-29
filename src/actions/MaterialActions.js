// actions/MATERIALActions.js
import {
    GET_MATERIALTYPE_REQUEST,
    GET_MATERIALTYPE_SUCCESS,
    GET_MATERIALTYPE_FAILURE,
    GET_MATERIAL_REQUEST,
    GET_MATERIAL_SUCCESS,
    GET_MATERIAL_FAILURE,
    GET_MATERIALREQUEST_FAILURE,
    GET_MATERIALREQUEST_REQUEST,
    GET_MATERIALREQUEST_SUCCESS,
    CREATE_MATERIAL_REQUEST,
    CREATE_MATERIAL_SUCCESS,
    CREATE_MATERIAL_FAILURE,
    UPDATE_MATERIAL_REQUEST,
    UPDATE_MATERIAL_SUCCESS,
    UPDATE_MATERIAL_FAILURE,
    UPDATE_MATERIALREQUEST_REQUEST,
    UPDATE_MATERIALREQUEST_SUCCESS,
    UPDATE_MATERIALREQUEST_FAILURE,
    DELETE_MATERIAL_REQUEST,
    DELETE_MATERIAL_SUCCESS,
    DELETE_MATERIAL_FAILURE,

} from '../actionTypes/MaterialTypes';
import { axiosInstance } from '../utils/baseurl';
import { showNotification } from '../utils/toastmessage';


export const getmaterialtypes = (site) => {
    return async (dispatch) => {
        dispatch({ type: GET_MATERIALTYPE_REQUEST });
        try {
            const response = await axiosInstance.get('/material/getmaterialtypes', {
                params: {
                    searchTerm: site
                }
            });
            console.log(response.data);
            dispatch({ type: GET_MATERIALTYPE_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_MATERIALTYPE_FAILURE, payload: error.response.data });
        }
    }
};


export const getmaterial = (page, limit, MaterialTypeFilter, siteFilter) => {
    return async (dispatch) => {
        dispatch({ type: GET_MATERIAL_REQUEST });
        try {
            const response = await axiosInstance.get(`/material/getmaterial?page=${page}&limit=${limit}`, {
                params: {
                    MaterialTypeFilter,
                    siteFilter
                }
            });
            console.log(response.data);
            dispatch({ type: GET_MATERIAL_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_MATERIAL_FAILURE, payload: error.response.data });
        }
    }
};


export const getmaterialrequest = (page, limit, statusfilter, typefilter) => {
    return async (dispatch) => {
        dispatch({ type: GET_MATERIALREQUEST_REQUEST });
        try {
            const response = await axiosInstance.get(`/material/getmaterialrequest?page=${page}&limit=${limit}`, {
                params: {
                    statusfilter, typefilter
                }
            });
            console.log(response.data);
            dispatch({ type: GET_MATERIALREQUEST_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_MATERIALREQUEST_FAILURE, payload: error.response.data });
        }
    }
};




export const creatematerial = (formData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MATERIAL_REQUEST });
        try {
            const response = await axiosInstance.post('/material/creatematerial', formData);
            console.log(response.data);
            dispatch({ type: CREATE_MATERIAL_SUCCESS, payload: response.data });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: CREATE_MATERIAL_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: CREATE_MATERIAL_FAILURE, payload: 'An error occurred while creating material' });
            }
        }
    }
};


export const updatematerial = (formData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MATERIAL_REQUEST });
        try {
            const response = await axiosInstance.put('/material/updatematerial', formData);
            console.log(response.data);
            dispatch({ type: UPDATE_MATERIAL_SUCCESS, payload: response.data });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: UPDATE_MATERIAL_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: UPDATE_MATERIAL_FAILURE, payload: 'An error occurred while creating material' });
            }
        }
    }
};


export const updatematerialrequest = (formData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MATERIALREQUEST_REQUEST });
        try {
            const response = await axiosInstance.put('/material/updatematerialrequest', formData);
            console.log(response.data);
            dispatch({ type: UPDATE_MATERIALREQUEST_SUCCESS, payload: response.data });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: UPDATE_MATERIALREQUEST_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: UPDATE_MATERIALREQUEST_FAILURE, payload: 'An error occurred while creating material' });
            }
        }
    }
};


export const deletematerial = (id) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MATERIAL_REQUEST });
        try {
            const response = await axiosInstance.delete('/material/deletematerial', id);
            console.log(response.data);
            dispatch({ type: DELETE_MATERIAL_SUCCESS, payload: response.data });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: DELETE_MATERIAL_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: DELETE_MATERIAL_FAILURE, payload: 'An error occurred while deleting material' });
            }
        }
    }
};
