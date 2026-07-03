import {
    SHOW_MODALS_LOADING,
    SIGN_IN, 
    SIGN_UP,
    SIGN_OUT,
    SAVE_DATA,
    SET_READY,
    CLEAR_DATA,
    RECOVER_PASSWORD,
    CHANGE_GPS_VISIBILITY,
    ASK_GPS_PERMISSION,
    OPEN_SETTINGS,
    CHANGE_PARKING_CTRL_VISIBILITY,
    SETTINGS_SHEET_VISIBILITY,
    SAVE_TOKEN_STATUS,
    SAVE_PRODUCTS,
    CHANGE_CONFIRM_CARD_VISIBILITY,
    UPDATE_PROFILE,
    SIGN_UP_SOCIAL,
    SET_ADDRESS,
    CLEAN_PRODUCTS,
    SAVE_PAYMENT_SUCCESS,
    SAVE_CARDS,
    SAVE_ITEMS,
    SAVE_DETAILS,
    SAVE_STORES
} from '../constants';

/*Actions controlados por el Saga*/
export function ActionShowModalsLoading(data) {
    return {
        type: SHOW_MODALS_LOADING,
        payload: data
    };
}

export function ActionUserSignIn(data) {
    return {
        type: SIGN_IN,
        payload: data
    }
}
export function ActionUserSignUp(data) {
    return {
        type: SIGN_UP,
        payload: data
    }
}
export function ActionUserSignOut() {
    return {
        type: SIGN_OUT
    }
}
export function ActionUserRecoverPassword(data) {
    return {
        type: RECOVER_PASSWORD,
        payload: data
    }
}

export function ActionUserSignUpSocial(data) {
    return {
        type: SIGN_UP_SOCIAL,
        payload: data
    }
}

/*Actions controlados por el reducer*/

export function ActionSaveAddress(data) {
    return {
        type: SET_ADDRESS,
        payload: data
    }
}
export function ActionUserSaveData(data) {
    return {
        type: SAVE_DATA,
        payload: data
    }
}
export function ActionUpdateUserData(data) {
    return {
        type: UPDATE_PROFILE,
        payload: data
    }
}
export function ActionInitApp(data) {
    return {
        type: SET_READY,
        payload: data
    }
}
export function ActionUserSaveTokenStatus(data) {
    return {
        type: SAVE_TOKEN_STATUS,
        payload: data
    }
}
export function ActionSavePaymentSuccess(data) {
    return {
        type: SAVE_PAYMENT_SUCCESS,
        payload: data
    }
}
export function ActionUserClearData() {
    return {
        type: CLEAR_DATA,
    }
}
export function ActionChangeGPSSheetVisibility(data) {
    return {
        type: CHANGE_GPS_VISIBILITY,
        payload: data
    }
}
export function ActionChangeConfirmCardVisibility(data) {
    return {
        type: CHANGE_CONFIRM_CARD_VISIBILITY,
        payload: data
    }
}
export function ActionChangeSettingsSheetVisibility(data) {
    return {
        type: SETTINGS_SHEET_VISIBILITY,
        payload: data
    }
}
export function ActionAskForGPSPermission(data) {
    return {
        type: ASK_GPS_PERMISSION,
        payload: data
    }
}
export function ActionOpenSettings(data) {
    return {
        type: OPEN_SETTINGS,
        payload: data
    }
}

export function ActionChangeParkingCtrlVisibility(data) {
    return {
        type: CHANGE_PARKING_CTRL_VISIBILITY,
        payload: data
    }
}
export function ActionSaveProductsSelected(data) {
    return {
        type: SAVE_PRODUCTS,
        payload: data
    }
}
export function ActionCleanProducts() {
    return {
        type: CLEAN_PRODUCTS,
    }
}
export function ActionSaveCard(data) {
    return {
        type: SAVE_CARDS,
        payload: data
    }
}
export function ActionSaveHistoryItems(data) {
    return {
        type: SAVE_ITEMS,
        payload: data
    }
}
export function ActionSaveItemDetails(data) {
    return {
        type: SAVE_DETAILS,
        payload: data
    }
}
export function ActionSaveStores(data) {
    return {
        type: SAVE_STORES,
        payload: data
    }
}