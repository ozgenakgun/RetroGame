import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, PASSWORD_CHANGED, PASSWORD_CHANGE_FAILED, ADMIN_LOADED, ADMIN_AUTH_ERROR, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGOUT } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    // if there is a token, load it
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Register User
export const register = ({ studentID, email, name, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ studentID, email, name, password });

    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        const res2 = await axios.post('/api/tasks');
        const res3 = await axios.post('/api/pet');

    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Change Password
export const changePassword = ({ password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ password });

    try {
        const res = await axios.post('/api/users/password', body, config);
        dispatch({
            type: PASSWORD_CHANGED,
            payload: res.data
        });

        dispatch(loadUser());
        
    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PASSWORD_CHANGE_FAILED
        });
    }
};

// Login User
export const login = ( studentID, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ studentID, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// Logout User
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

// Load Admin
export const loadAdmin = () => async dispatch => {
    // if there is a token, load it
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth/admin');

        dispatch({
            type: ADMIN_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: ADMIN_AUTH_ERROR
        });
    }
}


// Login Admin
export const loginAdmin = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth/admin', body, config);
        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadAdmin());
    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: ADMIN_LOGIN_FAIL
        });
    }
}

// Logout Admin
export const logoutAdmin = () => dispatch => {
    dispatch({
        type: ADMIN_LOGOUT
    });
}