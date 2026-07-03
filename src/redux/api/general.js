import {CHANGE_TOKEN} from '../../utils/urls';

export const apiChangeUserToken = (data, axios) => {
    return axios.post(CHANGE_TOKEN, data);
};