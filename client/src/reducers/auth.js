import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, PASSWORD_CHANGED, PASSWORD_CHANGE_FAILED, ADMIN_LOADED, ADMIN_AUTH_ERROR, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGOUT } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isAdminAuthenticated: null,
    loading: true,
    loadingAdmin: true,
    user: null,
    admin: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isAdminAuthenticated: false,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case PASSWORD_CHANGED:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isAdminAuthenticated: false,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case PASSWORD_CHANGE_FAILED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAdminAuthenticated: false,
                loading: false
            }
        case ADMIN_LOADED:
            return {
                ...state,
                isAuthenticated: false,
                isAdminAuthenticated: true,
                loadingAdmin: false,
                admin: payload
            }
        case ADMIN_LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                isAdminAuthenticated: true,
                loadingAdmin: false
                }
        case ADMIN_AUTH_ERROR:
        case ADMIN_LOGIN_FAIL:
        case ADMIN_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAdminAuthenticated: false,
                loadingAdmin: false
            }
        default:
            return state;
    }
}