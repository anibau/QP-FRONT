import {
    SAVE_CARDS,
} from '../constants';

const initialState = {
    cardsLoading: true,
    cardsError: false,
    cardsRegistered: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_CARDS:
            return ({ 
                ...state, 
                ...action.payload,
            });
        default:
            return state
    }
}