// actions/INVENTORYActions.js

import {
    GET_INVENTORY_REQUEST,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_FAILURE,
    CREATE_INVENTORY_REQUEST,
    CREATE_INVENTORY_SUCCESS,
    CREATE_INVENTORY_FAILURE,
} from '../actionTypes/InventoryTypes';
import { axiosInstance } from '../utils/baseurl';


export const getinventory = ( projectName, inventoryType, sortBy, sortOrder) => {
    return async (dispatch) => {
        dispatch({ type: GET_INVENTORY_REQUEST });
        try {
            const response = await axiosInstance.get('/inventory/getinventorydata', {
                params: {
                    projectName,
                    inventoryType,
                    sortBy,
                    sortOrder
                }
            });
            console.log(response.data);
            dispatch({ type: GET_INVENTORY_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: GET_INVENTORY_FAILURE, payload: error.response.data });
        }
    }
};


export const createinventory = (formData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INVENTORY_REQUEST });
        try {
            const response = await axiosInstance.post('/inventory/createinventory', formData);
            console.log(response.data);
            dispatch({ type: CREATE_INVENTORY_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: CREATE_INVENTORY_FAILURE, payload: error.response.data });
        }
    }
};
