import * as actionTypes from '../actionTypes/ProjectActionTypes';
import { axiosInstance } from '../utils/baseurl';
import { showNotification } from '../utils/toastmessage';

export const getProject = (page, limit, searchTerm, sortBy, sortOrder) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_PROJECT_REQUEST });
        try {
            const response = await axiosInstance.get(`/project/getproject?page=${page}&limit=${limit}`, {
                params: {
                    searchTerm,
                    sortBy,
                    sortOrder
                }
            });
            const projects = await response.data;
            dispatch({ type: actionTypes.GET_PROJECT_SUCCESS, payload: projects });
            return projects;
        } catch (error) {
            console.log(error);
            dispatch({ type: actionTypes.GET_PROJECT_FAILURE, payload: 'Failed to Fetch' });
        }
    };
};


export const createProject = (formData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
        try {
            console.log("formData", formData);
            const response = await axiosInstance.post('/project/createproject', formData);
            console.log(response.data.message);
            dispatch({ type: actionTypes.CREATE_PROJECT_SUCCESS, payload: response.data.message });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: actionTypes.CREATE_PROJECT_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: actionTypes.CREATE_PROJECT_FAILURE, payload: 'An error occurred while creating project' });
            }
        }
    };
};


export const updateProject = (formData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
        try {
            const response = await axiosInstance.put('/project/updateproject', formData);
            console.log(response.data)
            console.log(response.data.message);
            dispatch({ type: actionTypes.UPDATE_PROJECT_SUCCESS, payload: response.data.message });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: actionTypes.UPDATE_PROJECT_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: actionTypes.UPDATE_PROJECT_FAILURE, payload: 'An error occurred while updating project' });
            }
        }
    }
};

export const deleteProject = (storedID) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });
        console.log("storedID", storedID);
        try {
            const response = await axiosInstance.delete('/project/deleteproject', {
                params: {
                    storedID
                }
            });

            dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, payload: response.data.message });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: actionTypes.DELETE_PROJECT_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: actionTypes.DELETE_PROJECT_FAILURE, payload: 'An error occurred while deleting project' });
            }
        }
    };
}