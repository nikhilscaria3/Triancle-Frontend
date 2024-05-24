import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthReducer';
import invoiceReducer from '../reducers/InvoiceReducer';
import checklistReducer from '../reducers/ChecklistReducer';
import userReducer from '../reducers/UserReducer';
import projectReducer from '../reducers/ProjectReducer';
import inventoryReducer from '../reducers/InventoryReducer';
import materialReducer from '../reducers/MaterialReducer';
import documentReducer from '../reducers/DocumentReducer';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer, // You don't need to use combineReducers here if ProjectReducer already combines reducers internally
    invoice: invoiceReducer,
    checklist: checklistReducer,
    user: userReducer,
    inventory: inventoryReducer,
    material: materialReducer,
    document: documentReducer
});


const store = configureStore({
    reducer: rootReducer,
});


export default store;
