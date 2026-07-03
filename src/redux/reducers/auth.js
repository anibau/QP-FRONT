import {SAVE_DATA, CLEAR_DATA, SAVE_TOKEN_STATUS, SET_READY, UPDATE_PROFILE} from '../constants';

const initialState = {
    user: null,
    access_token: '',
    support_contact: '',
    isLogged: false,
    ready: false,
    isGuard: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_DATA:
            return {
                ...state,
                ...action.payload,
                isLogged: true,
                ready: true
            };
        case SET_READY:
            return {
                ...state,
                ready: true
            }
        case CLEAR_DATA:
            return {
                user: null,
                access_token: '',
                isLogged: false,
                ready: true
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                isLogged: true,
                ready: true,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        case SAVE_TOKEN_STATUS:
            return {
                user: {
                    ...state.user,
                    is_token: action.payload.token_status
                },
                access_token: state.access_token,
                isLogged: true,
                ready: true
            };
        default:
            return state;
    }
}