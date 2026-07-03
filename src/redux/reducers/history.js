import {SAVE_ITEMS, SAVE_DETAILS} from '../constants';

const initialState = {
    historyItems: [],
    historyPage: 1,
    historyItemsLoading: true,
    historyItemsError: false,
    historyItemDetails: {
        det: []
    },
    historyItemDetailsLoading: true,
    historyItemDetailsError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_ITEMS:
            return {
                ...state,
                ...action.payload,
            };
        case SAVE_DETAILS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}