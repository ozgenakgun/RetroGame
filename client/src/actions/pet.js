import axios from 'axios';
import { setAlert } from './alert';

import { GET_PET, PET_ERROR, UPDATE_PET, UPDATE_PET_FAIL } from './types';

// Get current user pet
export const getUserPet = () => async dispatch => {
    try {
        const res = await axios.get('/api/pet/me');

        dispatch({
            type: GET_PET,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PET_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status }
        });
    }
}

// Update Pet NOT TESTED YET
export const updatePet = ({ option, awardID }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ option: option, awardID: awardID });

    try {
        const res = await axios.post('/api/pet/modify', body, config);
        dispatch({
            type: UPDATE_PET,
            payload: res.data
        });

    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: UPDATE_PET_FAIL
        });
    }
};