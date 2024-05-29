
import {
    CREATE_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_SUCCESS,
    CREATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_FAILURE,
    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAILURE,
    GET_DOCUMENT_FAILURE,
    GET_DOCUMENT_SUCCESS,
    GET_DOCUMENT_REQUEST
} from '../actionTypes/DocumentTypes';
import { axiosInstance } from '../utils/baseurl';
import socket from '../utils/socket';
import { showNotification } from '../utils/toastmessage';




export const createDocument = (documentData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_DOCUMENT_REQUEST });
        try {
            const response = await axiosInstance.post('/document/createdocument', documentData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (documentData.sendNotification) {
                const token = localStorage.getItem('accesstoken');
                const userId = Number(documentData.selectedUsers);
                socket.emit('documentassignnotification', userId, token);
            }
            dispatch({ type: CREATE_DOCUMENT_SUCCESS, payload: response.data.message });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: CREATE_DOCUMENT_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: CREATE_DOCUMENT_FAILURE, payload: 'An error occurred while creating document' });
            }
        }
    }
};

export const updateDocument = (documentData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_DOCUMENT_REQUEST });
        try {
            const response = await axiosInstance.put('/document/updatedocument', documentData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            dispatch({ type: UPDATE_DOCUMENT_SUCCESS, payload: response.data.message });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: UPDATE_DOCUMENT_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: UPDATE_DOCUMENT_FAILURE, payload: 'An error occurred while creating document' });
            }
        }
    }
};


export const deleteDocument = (documentID) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_DOCUMENT_REQUEST });
        try {
            const response = await axiosInstance.delete('/document/deletedocument', {
                params: {
                    documentID
                }
            });
            dispatch({ type: DELETE_DOCUMENT_SUCCESS, payload: response.data.message });
            showNotification({ type: "SUCCESS", message: response.data.message });
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                dispatch({ type: DELETE_DOCUMENT_FAILURE, payload: errorMessage });
                showNotification({ type: "ERROR", message: errorMessage });
            } else {
                console.log(error);
                dispatch({ type: DELETE_DOCUMENT_FAILURE, payload: 'An error occurred while creating document' });
            }
        }
    }
};

export const getDocument = (page, limit, projectFilter, typefilter, documentid) => {
    return async (dispatch) => {
        dispatch({ type: GET_DOCUMENT_REQUEST });
        try {
            const response = await axiosInstance.get(`/document/getdocument?page=${page}&limit=${limit}`, {
                params: {
                    projectFilter,
                    typefilter,
                    documentid
                }
            });
            if (response.data) {
                dispatch({ type: GET_DOCUMENT_SUCCESS, payload: response.data });
                console.log(response.data); // Log the entire response object
            } else {
                throw new Error('Response data is undefined');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
            dispatch({ type: GET_DOCUMENT_FAILURE, payload: error.response ? error.response.data : 'Unknown error' });
        }
    }
};
