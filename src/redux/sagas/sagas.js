import axios from 'axios';
import { apiSignUpUser, apiRecoverPasswordUser, apiSignUpSocialUser } from '../api/register';
import { apiGetTendsList } from '../api/general';
import _ from 'lodash';
import i18n from '../../config/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FETCHING_DATA, SHOW_MODALS_LOADING, SIGN_UP_SOCIAL } from '../../redux/constants';
import { SIGN_UP, RECOVER_PASSWORD } from '../constants';
import { AUTH_ASYNCSTORAGE_KEY } from '../../config/constants';

// Helpers API
const signUpUserApi = (payload) => apiSignUpUser(payload, axios);
const signUpUserSocialApi = (payload) => apiSignUpSocialUser(payload, axios);
const recoverPasswordUserApi = (payload) => apiRecoverPasswordUser(payload, axios);
const getTendsListApi = () => apiGetTendsList(axios);

// THUNKS

export const signUpUserThunk = (values) => async (dispatch) => {
  dispatch({
    type: SHOW_MODALS_LOADING,
    payload: {
      displaySignUp: true,
      displaySignUpLoading: true,
    },
  });

  try {
    const response = await signUpUserApi(values.payload);

    if (response.status === 200) {
      const userData = {
        ...response.data.data,
        is_token: 1,
        password: values.password,
      };

      await AsyncStorage.setItem(
        AUTH_ASYNCSTORAGE_KEY,
        JSON.stringify({
          user: userData,
          access_token: response.data.token,
        })
      );

      dispatch({
        type: SHOW_MODALS_LOADING,
        payload: {
          displaySignUp: false,
          displaySignUpLoading: false,
          successSignUp: true,
          tempUserData: {
            user: userData,
            access_token: response.data.token,
          },
          successMessage: i18n.t('register.success'),
        },
      });
    } else {
      throw response;
    }
  } catch (error) {
    const errorResponse = error?.response?.data ?? null;
    const message = errorResponse?.message ?? i18n.t('error.generic');

    dispatch({
      type: SHOW_MODALS_LOADING,
      payload: {
        displayError: true,
        displaySignUp: true,
        displaySignUpInfo: true,
        messageInfo: message,
      },
    });
  }
};

export const signUpSocialUserThunk = (values) => async (dispatch) => {
  dispatch({
    type: SHOW_MODALS_LOADING,
    payload: {
      displaySignUp: true,
      displaySignUpLoading: true,
    },
  });

  try {
    const response = await signUpUserSocialApi(values.payload);

    if (response.status === 200) {
      const userData = {
        ...response.data.data,
        is_token: 1,
      };

      await AsyncStorage.setItem(
        AUTH_ASYNCSTORAGE_KEY,
        JSON.stringify({
          user: userData,
          access_token: response.data.token,
        })
      );

      dispatch({
        type: SHOW_MODALS_LOADING,
        payload: {
          displaySignUp: false,
          displaySignUpLoading: false,
          successSignUp: true,
          tempUserData: {
            user: userData,
            access_token: response.data.token,
          },
          successMessage: i18n.t('register.success'),
        },
      });
    } else {
      throw response;
    }
  } catch (error) {
    const errorResponse = error?.response?.data ?? null;
    const message = errorResponse?.message ?? i18n.t('error.generic');

    dispatch({
      type: SHOW_MODALS_LOADING,
      payload: {
        displayError: true,
        displaySignUp: true,
        displaySignUpInfo: true,
        messageInfo: message,
      },
    });
  }
};

export const recoverPasswordThunk = (values) => async (dispatch) => {
  dispatch({
    type: SHOW_MODALS_LOADING,
    payload: {
      displayRecovering: true,
      displayRecoveringLoading: true,
    },
  });

  try {
    const response = await recoverPasswordUserApi(values.payload);

    dispatch({
      type: SHOW_MODALS_LOADING,
      payload: {
        displayRecovering: false,
        displayRecoveringLoading: false,
      },
    });

    if (response.status === 200 && response.data.status === "200") {
      dispatch({
        type: SHOW_MODALS_LOADING,
        payload: {
          displayRecovering: true,
          successRecovering: true,
          displayRecoveringInfo: true,
          messageInfo: response.data.message,
          successMessage: i18n.t('pages.recover_password.success'),
        },
      });
    }
  } catch (error) {
    const errorResponse = error?.response?.data ?? null;
    const message = errorResponse?.message ?? i18n.t('error.generic');

    dispatch({
      type: SHOW_MODALS_LOADING,
      payload: {
        displayError: true,
        displayRecovering: true,
        displayRecoveringInfo: true,
        messageInfo: message,
      },
    });
  }
};

export const getTendsListThunk = () => async (dispatch) => {
  dispatch({
    type: FETCHING_DATA,
    payload: {
      displayGetTends: true,
      displayGetTendsLoading: true,
    },
  });

  try {
    const response = await getTendsListApi();

    dispatch({
      type: FETCHING_DATA,
      payload: {
        displayGetTends: false,
        displayGetTendsLoading: false,
      },
    });

    if (response.status === 200 && response.data.status) {
      dispatch({
        type: FETCHING_DATA,
        payload: {
          tendsList: response.data.data,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: FETCHING_DATA,
      payload: {
        displayGetTends: false,
        displayGetTendsLoading: false,
      },
    });
  }
};
