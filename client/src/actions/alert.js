import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // alert is removed after 5 seconds by default, but it can be passed to setAlert
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};