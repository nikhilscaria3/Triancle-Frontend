
import {
    CREATE_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_SUCCESS,
    CREATE_DOCUMENT_REQUEST,
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



export const getDocument = (projectFilter, typefilter, documentid) => {
    return async (dispatch) => {
        dispatch({ type: GET_DOCUMENT_REQUEST });
        try {
            const response = await axiosInstance.get('/document/getdocument', {
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
