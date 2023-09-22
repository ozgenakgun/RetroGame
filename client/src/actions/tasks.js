import axios from 'axios';
import { setAlert } from './alert';

import { GET_TASKS, TASKS_ERROR, COMPLETE_TASK, COMPLETE_TASK_FAIL } from './types';

// Get current user tasks
export const getUserTasks = () => async dispatch => {
    try {
        const res = await axios.get('/api/tasks/me');

        dispatch({
            type: GET_TASKS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status }
        });
    }
}

// Complete Task NOT TESTED YET
export const completeTask = ({ studentID, taskID, taskComplete }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ studentID, taskID, taskComplete });

    try {
        const res = await axios.post('/api/tasks/admin', body, config);
        dispatch({
            type: COMPLETE_TASK,
            payload: res.data
        });

    } catch(err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: COMPLETE_TASK_FAIL
        });
    }
};