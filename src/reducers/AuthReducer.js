// reducer.js
import * as actionTypes from '../actionTypes/AuthTypes';

const initialState = {
    usertoken: null,
    loading: false,
    error: null,
    signupSuccess: false,
    loginSuccess: false,
    resetSuccess: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_REQUEST:
        case actionTypes.FORGOT_PASSWORD_REQUEST:
        case actionTypes.RESET_PASSWORD_REQUEST:
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                signupSuccess: false,
                loginSuccess: false
            };
        case actionTypes.SIGNUP_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.FORGOT_PASSWORD_SUCCESS:
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                signupSuccess: true,
                loginSuccess: true,
                resetSuccess: true,
                usertoken: action.payload // Assuming the payload contains user data
            };
        case actionTypes.SIGNUP_FAILURE:
        case actionTypes.FORGOT_PASSWORD_FAILURE:
        case actionTypes.LOGIN_FAILURE:
        case actionTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                signupSuccess: false,
                loginSuccess: false
            };
        default:
            return state;
    }
};

export default authReducer;
