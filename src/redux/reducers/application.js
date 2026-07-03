import {
    SHOW_MODALS_LOADING,
    CHANGE_GPS_VISIBILITY,
    ASK_GPS_PERMISSION,
    CHANGE_PARKING_CTRL_VISIBILITY,
    SETTINGS_SHEET_VISIBILITY,
    OPEN_SETTINGS,
    CHANGING_TOKEN,
    CHANGE_CONFIRM_CARD_VISIBILITY
  } from '../constants';

  const initialState = {
    displaySignIn: false,
    displaySignInInfo: false,
    displaySignInLoading: false,
    successSignIn: false,
    displaySignInSocial: false,
    displaySignInSocialInfo: false,
    displaySignInSocialLoading: false,
    successSignInSocial: false,
    completeSignInSocial: false,
    tempSocialData: null,
    displaySigUp: false,
    displaySignUpInfo: false,
    displaySignUpLoading: false,
    successSignUp: false,
    displayRecovering: false,
    displayRecoveringInfo: false,
    displayRecoveringLoading: false,
    successRecovering: false,
    tempUserData: null,
    gpsSheetVisible: false,
    settingsSheetVisible: false,
    askGPSPermission: false,
    openSettings: false,
    changePassVisible: false,
    parkingControlVisible: false,
    nearTendsVisible: false,
    productPreviewVisible: false,
    cvvInputVisible: false,
    successSheetVisible: false,
    onContinue: false,
    successSheetTitle: "",
    successButtonText: "",
    inputTokenVisible: false,
    changeTokenVisible: false,
    changeTokenSheetTitle: "",
    changeTokenSheetSubtitle: "",
    messageInfo: "",
    displayChangeToken: false,
    displayChangeTokenInfo: false,
    displayChangeTokenLoading: false,
    successChangeToken: false,
    displayChangePass: false,
    displayChangePassInfo: false,
    displayChangePassLoading: false,
    successChangePass: false,
    changeConfirmCardVisible: false
  }
  export default function (state = initialState, action) {
    switch (action.type) {
      case SHOW_MODALS_LOADING:
        return ({ ...state, ...action.payload })
      case CHANGE_GPS_VISIBILITY:
        return ({ ...state, ...action.payload })
      case ASK_GPS_PERMISSION:
        return ({ ...state, ...action.payload })
      case CHANGE_PARKING_CTRL_VISIBILITY:
        return ({ ...state, ...action.payload })
      case SETTINGS_SHEET_VISIBILITY:
        return ({ ...state, ...action.payload })
      case OPEN_SETTINGS:
        return ({ ...state, ...action.payload })
      case CHANGE_CONFIRM_CARD_VISIBILITY:
        return ({ ...state, ...action.payload })
      case CHANGING_TOKEN:
        return ({ ...state, ...action.payload })
      default:
        return state
    }
  }