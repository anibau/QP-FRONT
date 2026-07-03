import {
    SAVE_PRODUCTS,
    CLEAN_PRODUCTS,
    SAVE_PAYMENT_SUCCESS,
    SAVE_STORES
} from '../constants';

const initialState = {
    productsScanned: [],
    localeId: '',
    paymentSuccess: false,
    paymentComplete: false,
    paymentError: false,
    storesList: [],
    storesListLoading: true,
    storesListError: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_PRODUCTS:
            return ({ 
                ...state, 
                productsScanned: action.payload.products,
                localeId: action.payload.localeId.toString()
            });
        case CLEAN_PRODUCTS:
            return ({ 
                ...state, 
                productsScanned: [],
                localeId: ''
            });
        case SAVE_PAYMENT_SUCCESS:
            return ({ 
                ...state, 
                paymentSuccess: action.payload.success,
                paymentError: action.payload.error,
                paymentComplete: action.payload.complete,
            });
        case SAVE_STORES:
            return ({ 
                ...state, 
                ...action.payload,
            });
        default:
            return state
    }
}