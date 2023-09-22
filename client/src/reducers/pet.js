import { GET_PET, PET_ERROR, UPDATE_PET, UPDATE_PET_FAIL } from "../actions/types";

const initialState = {
    pet: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_PET:
        case UPDATE_PET:
            return {
                ...state,
                pet: payload,
                loading: false
            }
        case PET_ERROR:
        case UPDATE_PET_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}