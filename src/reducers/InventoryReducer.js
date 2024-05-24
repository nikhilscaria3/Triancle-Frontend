// reducers/InvoiceReducer.js

import {
    CREATE_INVENTORY_REQUEST,
    CREATE_INVENTORY_SUCCESS,
    CREATE_INVENTORY_FAILURE,
    GET_INVENTORY_REQUEST,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_FAILURE,
} from '../actionTypes/InventoryTypes';


const initialState = {
    inventorydata: {}, // <-- This is an object
    loading: false,
    error: null,
};


const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_INVENTORY_REQUEST:
        case GET_INVENTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_INVENTORY_SUCCESS:
            return { ...state, loading: false, error: null };
        case GET_INVENTORY_SUCCESS:
            return { ...state, loading: false, inventorydata: action.payload, error: null };
        case CREATE_INVENTORY_FAILURE:
        case GET_INVENTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default inventoryReducer;
