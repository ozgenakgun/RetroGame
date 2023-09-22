import { GET_TASKS, TASKS_ERROR, COMPLETE_TASK, COMPLETE_TASK_FAIL } from "../actions/types";

const initialState = {
    tasks: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_TASKS:
        case COMPLETE_TASK:
            return {
                ...state,
                tasks: payload,
                loading: false
            }
        case TASKS_ERROR:
        case COMPLETE_TASK_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}