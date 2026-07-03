import {SIGN_IN, SIGN_OUT, SIGN_UP, DETAILS, RECOVER_PASSWORD, CHANGE_PASSWORD, SIGN_UP_SOCIAL} from '../../utils/urls';

export const apiSignInUser = (data, axios) => {
    return axios.post(SIGN_IN, data);
};
export const apiSignOutUser = (axios) => {
    return axios.post(SIGN_OUT);
};
export const apiDetails = (axios) => {
    return axios.get(DETAILS);
};
export const apiSignUpUser = (data, axios) => {
    return axios.post(SIGN_UP, data);
};
export const apiRecoverPasswordUser = (data, axios) => {
    return axios.post(RECOVER_PASSWORD, data);
};
export const apiSignUpSocialUser = (data, axios) => {
    return axios.post(SIGN_UP_SOCIAL, data);
};
export const apiChangeUserPassword = (data, axios) => {
    return axios.post(CHANGE_PASSWORD, data);
};